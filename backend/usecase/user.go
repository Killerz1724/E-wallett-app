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
	UserLoginUsecase(context.Context, entity.LoginBody) (*entity.LoginResponse,error)
	UsecaseRegister(context.Context, entity.RegisterBody) error
	UserShowUserDetailsUsecase( context.Context,  string) (*entity.ShowUserProfileRes, error)
	UserIncomeUsecase(context.Context, string ) (*entity.UserIncomeRes,error)
	UserExpenseUsecase(context.Context, string ) (*entity.UserExpenseRes,error)  
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
		return &entity.CustomError{Msg: constant.RegisterErrorType{Msg: constant.CommonError.Error()}, Log: errCrypt}
	}

	req.Email = strings.ToLower(req.Email)
	req.Password = hash

	err := uuc.ur.UserRepoRegister(c, req)

	if err != nil {
		return err
	}

	return err
}

func (uuc UserUsecaseImpl) UserLoginUsecase(c context.Context, req entity.LoginBody) (*entity.LoginResponse,error) {

	req.Email = strings.ToLower(req.Email)

	password, err := uuc.ur.UserLoginRepo(c, req)
	if err != nil {
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(password), []byte(req.Password))

	if err != nil {
		return nil, &entity.CustomError{
			Msg: constant.LoginErrorType{Msg: constant.LoginError.Error()},
			Log: err,
		}
	}

	token, err := utils.GeneratingJWTToken(req.Email)

	if err != nil {
		return nil, err
	}

	res := &entity.LoginResponse{
		AccessToken: token,
	}

	return res, nil
}

func (uuc UserUsecaseImpl) UserShowUserDetailsUsecase(c context.Context, sub string) (*entity.ShowUserProfileRes, error){

	// sub, err := utils.ExtractTokenSubject(token)

	// if err != nil {
	// 	return nil, err
	// }

	user, err := uuc.ur.UserShowUserDetailsRepo(c, sub)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (uuc UserUsecaseImpl) UserIncomeUsecase(c context.Context, email string ) (*entity.UserIncomeRes,error) {

	res, err := uuc.ur.UserIncomeRepo(c, email)

	if err !=nil {
		return  nil, err
	}

	return res, nil

}

func (uuc UserUsecaseImpl) UserExpenseUsecase(c context.Context, email string ) (*entity.UserExpenseRes,error) {
	res, err := uuc.ur.UserExpenseRepo(c, email)

	if err !=nil {
		return  nil, err
	}

	return res, nil
}