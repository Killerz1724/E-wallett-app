package repository

import (
	"context"
	"database/sql"
	"errors"
	"ewallet/entity"
)

type UserRepoItf interface {
	UserLoginRepo(c context.Context, req entity.LoginBody) (string, error) 
}

type UserRepoImpl struct {
	db *sql.DB
}

func NewUserRepo(dbConn *sql.DB) UserRepoImpl {
	return UserRepoImpl{
		db: dbConn,
	}
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
		
		return "", errors.New("invalid email or password")
	}
	return password, nil
}