package repository

import (
	"context"
	"database/sql"
	"errors"
	"ewallet/constant"
	"ewallet/entity"

	"github.com/jackc/pgx/v5/pgconn"
)

type UserRepoItf interface {
	UserLoginRepo( context.Context,  entity.LoginBody) (string, error) 
	UserRepoRegister( context.Context,  entity.RegisterBody) error
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

	_, err := ur.db.ExecContext(c, `
	INSERT INTO users(username, password, email)
	VALUES
		($1, $2, $3);
	`, req.Username, req.Password, req.Email)

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