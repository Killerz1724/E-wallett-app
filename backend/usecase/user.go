package usecase

import (
	"context"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/repository"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type UserUsecaseItf interface {
	UserLoginUsecase(context.Context, entity.LoginBody) error
}

type UserUsecaseImpl struct {
	ur repository.UserRepoItf
}

func NewUserUsecase(ur repository.UserRepoItf) UserUsecaseImpl {
	return UserUsecaseImpl{
		ur: ur,
	}
}

func (uuc UserUsecaseImpl) UserLoginUsecase(c context.Context, req entity.LoginBody) error {

	req.Email = strings.ToLower(req.Email)


	password, err := uuc.ur.UserLoginRepo(c, req)
	if err != nil {
		return err
	}

	err = bcrypt.CompareHashAndPassword([]byte(password), []byte(req.Password))

	if err != nil {
		
		return &entity.CustomError{
			Msg: constant.LoginErrorType{Msg: constant.LoginError.Error()},
			Log: err,
		}
	}

	return nil
}