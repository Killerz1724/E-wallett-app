package usecase

import (
	"context"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/repository"
	"ewallet/utils"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type UserUsecaseItf interface {
	UserLoginUsecase(context.Context, entity.LoginBody) error
	UsecaseRegister(context.Context, entity.RegisterBody) error
}

type UserUsecaseImpl struct {
	ur repository.UserRepoItf
}

func NewUserUsecase(ur repository.UserRepoItf) UserUsecaseImpl {
	return UserUsecaseImpl{
		ur: ur,
	}
}

func (uuc UserUsecaseImpl) UsecaseRegister(c context.Context, req entity.RegisterBody) error {

	hash, errCrypt := utils.HashPassword(req.Password)

	if errCrypt != nil {
		return entity.CustomError{Msg: constant.RegisterErrorType{Msg: constant.CommonError.Error()}, Log: errCrypt}
	}

	req.Email = strings.ToLower(req.Email)
	req.Password = hash

	err := uuc.ur.UserRepoRegister(c, req)

	if err != nil {
		return err
	}

	return err
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