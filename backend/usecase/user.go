package usecase

import (
	"context"
	"ewallet/entity"
	"ewallet/repository"
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
	return nil
}