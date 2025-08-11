package repository

import (
	"context"
	"database/sql"
	"ewallet/entity"
)

type UserRepoItf interface {
	UserLoginRepo(c context.Context, req entity.LoginBody) error 
}

type UserRepoImpl struct {
	db *sql.DB
}

func NewUserRepo(dbConn *sql.DB) UserRepoImpl {
	return UserRepoImpl{
		db: dbConn,
	}
}

func (ur UserRepoImpl) UserLoginRepo(c context.Context, req entity.LoginBody) error {


	return nil
}