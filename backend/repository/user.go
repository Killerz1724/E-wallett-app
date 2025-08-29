package repository

import (
	"context"
	"database/sql"
	"errors"
	"ewallet/constant"
	"ewallet/entity"

	"github.com/jackc/pgx/v5/pgconn"
	"github.com/shopspring/decimal"
)

type UserRepoItf interface {
	UserLoginRepo( context.Context,  entity.LoginBody) (string, error) 
	UserRepoRegister( context.Context,  entity.RegisterBody) error
	UserShowUserDetailsRepo( context.Context,  string) (*entity.ShowUserProfileRes, error)
	UserIncomeRepo(context.Context, string ) (*entity.UserIncomeRes,error) 
}

type UserRepoImpl struct {
	db *sql.DB
}

func NewUserRepo(dbConn *sql.DB) UserRepoImpl {
	return UserRepoImpl{
		db: dbConn,
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

func (ur UserRepoImpl) UserShowUserDetailsRepo(c context.Context, sub string) (*entity.ShowUserProfileRes, error){

	row := ur.db.QueryRowContext(c, `
	SELECT u.username, u.email, u.profile_image, w.balance
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