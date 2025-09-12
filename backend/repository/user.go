package repository

import (
	"context"
	"database/sql"
	"errors"
	"ewallet/constant"
	"ewallet/entity"
	"fmt"
	"os"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/shopspring/decimal"
)

type UserRepoItf interface {
	UserLoginRepo( context.Context,  entity.LoginBody) (string, error) 
	UserRepoRegister( context.Context,  entity.RegisterBody) error
	UserReqResetPassRepo( context.Context,  entity.ResetReqPassBody) (*entity.ResetReqPassResponse, error)
	UserUpdatePassRepo( context.Context, entity.ResetPassBody) error
	UserShowUserDetailsRepo( context.Context,  string) (*entity.ShowUserProfileRes, error)
	UserIncomeRepo(context.Context, string ) (*entity.UserIncomeRes,error)
	UserExpenseRepo(context.Context, string ) (*entity.UserExpenseRes,error)
	UserChangeProfilePicRepo(context.Context, entity.ChangeProfilePictureBody) (*entity.ChangeProfilePictureRes, error)
	GetUsernameByEmail(context.Context, string) (*string, error) 
}

type UserRepoImpl struct {
	sc *SupabaseClientImpl
	db *sql.DB
}

func NewUserRepo(dbConn *sql.DB, sc *SupabaseClientImpl) UserRepoImpl {
	return UserRepoImpl{
		db: dbConn,
		sc: sc,
	}
}

func (ur UserRepoImpl) UserRepoRegister(c context.Context, req entity.RegisterBody) error {

	row := ur.db.QueryRowContext(c, `
	INSERT INTO users(username, profile_image, password, email)
	VALUES
		($1, '', $2, $3)
	RETURNING id;
	`, req.Username, req.Password, req.Email)

	var userId int
	err := row.Scan(&userId)

	if err != nil {
		var perr *pgconn.PgError
		if errors.As(err, &perr) {
			return &entity.CustomError{
				Msg: constant.RegisterErrorType{Msg: constant.AccountAlreadyExist.Error()},
				Log: err,
			}
		}
		return &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	_, err = ur.db.ExecContext(c, `
	INSERT INTO wallets(user_id, balance)
	VALUES
	($1, 0);
	`,  userId)

	if err != nil {
		return &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return nil

}

func (ur UserRepoImpl) UserLoginRepo(c context.Context, req entity.LoginBody) (string, error) {

	row := ur.db.QueryRowContext(c, `
	SELECT password 
	FROM users
	WHERE email = $1;
	`, req.Email)

	
	var password string
	err := row.Scan(&password)

	if err != nil {
		
		return "", &entity.CustomError{
			Msg: constant.LoginErrorType{Msg: constant.LoginError.Error()},
			Log: err,
		}
	}
	return password, nil
}

func (ur UserRepoImpl) UserReqResetPassRepo(c context.Context, req entity.ResetReqPassBody) (*entity.ResetReqPassResponse, error) {
	var check string

	//Check user exist
	userExist := ur.db.QueryRowContext(c, `
		SELECT id
		FROM users u
		WHERE u.email = $1;
	`, req.Email)

	var userId int
	err := userExist.Scan(&userId)

	if err != nil {
		return nil, &entity.CustomError{Msg: constant.QueryErrorType{Msg: constant.NotFound.Error()}, Log: err}
	}

	//Check is there a active token or not
	tokenExist := ur.db.QueryRowContext(c, `
		SELECT 1
		FROM password_tokens pt
		WHERE pt.user_Id = $1 AND pt.deleted_at is null;
	`, userId)

	err = tokenExist.Scan(&check)

	//Auto delete previous token
	if !errors.Is(err, sql.ErrNoRows) {
		_, err := ur.db.ExecContext(c, `
		UPDATE password_tokens
		SET
			deleted_at = NOW()
		WHERE id = (select distinct on (user_id) id
		from password_tokens
		order by user_id, created_at desc 
			OFFSET 1 LIMIT 1
			);
	
		`)
		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}
	}

	row := ur.db.QueryRowContext(c, `
	INSERT INTO password_tokens(user_id)
	VALUES
		($1)
	RETURNING reset_token_number;
	`, userId)

	var res entity.ResetReqPassResponse

	err = row.Scan(&res.Token)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return &res, nil

}

func (ur UserRepoImpl) UserUpdatePassRepo(c context.Context, req entity.ResetPassBody) error {

	var check int

	//Check token exist or not
	tokenExist := ur.db.QueryRowContext(c, `
		SELECT user_id
		FROM password_tokens pt
		WHERE pt.reset_token_number = $1 AND pt.deleted_at is null;
	`, req.Token)

	err := tokenExist.Scan(&check)

	if errors.Is(err, sql.ErrNoRows) {
		return &entity.CustomError{Msg: constant.QueryErrorType{Msg: constant.InvalidToken.Error()}, Log: err}

	}

	_, err = ur.db.ExecContext(c, `
	UPDATE users
	SET password = $1
	WHERE id = $2
	`, req.NewPassword, check)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	_, err = ur.db.ExecContext(c, `
	UPDATE password_tokens
	SET deleted_at = NOW()
	WHERE reset_token_number = $1
	`, req.Token)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}
	return nil

}

func (ur UserRepoImpl) UserShowUserDetailsRepo(c context.Context, sub string) (*entity.ShowUserProfileRes, error){

	row := ur.db.QueryRowContext(c, `
	SELECT u.username, u.email, u.profile_image, w.balance, w.wallet_number
	FROM users u
	JOIN wallets w
	ON u.id = w.user_id
	WHERE u.email = $1;
	`, sub)

	var user entity.ShowUserProfileRes

	err := row.Scan(
		&user.Username,
		&user.Email,
		&user.ImgUrl,
		&user.Balance,
		&user.WalletNumber,
	)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.ShowUserDetailError{Msg: constant.ShowUserDetailsError.Error()},
			Log: err,
		}
	}

	return &user, nil
}

func (ur UserRepoImpl) UserIncomeRepo(c context.Context, email string ) (*entity.UserIncomeRes,error){

	q := `
	SELECT id 
	FROM users u
	WHERE u.email = $1;
	`
	var userId int
	row := ur.db.QueryRowContext(c, q, email)
	
	err := row.Scan(&userId)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.ShowUserDetailError{Msg: constant.ShowUserDetailsError.Error()},
			Log: err,
		}
	}

	q = `
	SELECT COALESCE(SUM(amount), 0) AS total_amount 
	FROM transaction_histories th
	WHERE th.user_id = $1 
		AND th.source_fund_id <> 1 
		AND th.transaction_time >= date_trunc('month', CURRENT_DATE) 
		AND th.transaction_time < (date_trunc('month', CURRENT_DATE) + interval '1 month');
	`

	var totalAmount decimal.Decimal
	
	rows := ur.db.QueryRowContext(c, q, userId)
	err = rows.Scan(&totalAmount)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return &entity.UserIncomeRes{TotalIncome: totalAmount}, nil
}

func (ur UserRepoImpl) UserExpenseRepo(c context.Context, email string ) (*entity.UserExpenseRes,error){

	q := `
	SELECT id 
	FROM users u
	WHERE u.email = $1;
	`
	var userId int
	row := ur.db.QueryRowContext(c, q, email)
	
	err := row.Scan(&userId)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.ShowUserDetailError{Msg: constant.ShowUserDetailsError.Error()},
			Log: err,
		}
	}

	q = `
	SELECT COALESCE(SUM(amount), 0) AS total_amount 
	FROM transaction_histories th
	WHERE th.user_id = $1 
		AND th.source_fund_id = 1 
		AND th.transaction_time >= date_trunc('month', CURRENT_DATE) 
		AND th.transaction_time < (date_trunc('month', CURRENT_DATE) + interval '1 month');
	`

	var totalAmount decimal.Decimal
	
	rows := ur.db.QueryRowContext(c, q, userId)
	err = rows.Scan(&totalAmount)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return &entity.UserExpenseRes{TotalExpense: totalAmount}, nil
} 

func (ur UserRepoImpl) GetUsernameByEmail(c context.Context, email string) (*string, error) {

	q := `
	SELECT username
	FROM users
	WHERE email = $1
	`
	row := ur.db.QueryRowContext(c, q, email)

	var username string

	err := row.Scan(&username)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.ShowUserDetailError{Msg: constant.ShowUserDetailsError.Error()},
			Log: err,
		}
	}

	return &username, nil
}

func (ur UserRepoImpl) UserChangeProfilePicRepo(c context.Context, req entity.ChangeProfilePictureBody) (*entity.ChangeProfilePictureRes,error) {

	username, err := ur.GetUsernameByEmail(c, req.UserId)

	if err != nil {
		return nil, err
	}

	profileBucket := os.Getenv("EWALLET_BUCKET")
	filePath := fmt.Sprintf("profile-pictures/%s/avatar-%s.%s", *username, uuid.New().String(),strings.Split(req.ContentType, "/")[1])
	err = ur.sc.UploadFile(profileBucket, filePath, &req.ContentType, req.ImgFile)

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	newImgUrl := new(string)
	ur.sc.GetPublicFileURL(profileBucket, filePath, newImgUrl)

	if newImgUrl == nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	q := `
	UPDATE users
	SET profile_image = $1
	WHERE email = $2
	RETURNING profile_image;
	`

	 row := ur.db.QueryRowContext(c, q, *newImgUrl, req.UserId)

	var res entity.ChangeProfilePictureRes

	err = row.Scan(&res.ImgUrl)
	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return &res, nil 
	
}

