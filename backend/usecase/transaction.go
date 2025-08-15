package usecase

import (
	"context"
	"errors"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/repository"
	"fmt"
	"strconv"
	"time"

	"github.com/shopspring/decimal"
)

type TransactionUsecaseItf interface {
	ListAllTransactionUsecase(context.Context, string, string, string, string, []string, []string, string, string) (*entity.ListTransactionResponse, error)
	TopUpUsecase(context.Context, entity.TopUpBody, string) error
	TransferUsecase(context.Context, entity.TransferBody, string) error
	ListAllUsersUsecase(context.Context,  string, string,  string) (*entity.ListAllUsersResponse, error)
}

type TransactionUsecaseImpl struct {
	tr repository.TransactionRepoItf
	txr repository.TxItf
}

func NewTransactionUsecase(tr repository.TransactionRepoItf, txr repository.TxItf) TransactionUsecaseImpl {
	return TransactionUsecaseImpl{
		tr: tr, 
		txr: txr,
	}
}

func (tu TransactionUsecaseImpl) ListAllTransactionUsecase(c context.Context, sub string, sd string, ed string, searchFilt string, order []string, sort []string, page string, lp string) (*entity.ListTransactionResponse, error) {
	var sdDate, edDate time.Time
	var pg, limitPage int
	var err error

	if sd != "" {
		sdDate, err = time.Parse("2006-01-02", sd)
		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}
	}

	if ed != "" {
		edDate, err = time.Parse("2006-01-02", ed)
		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}
	}

	if page == ""  {
		pg = 1
	}else {
		pg, err = strconv.Atoi(page)
		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}
	}

	if lp != "" {
		limitPage, err = strconv.Atoi(lp)
		if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}

		if limitPage < 0 {
			limitPage = 0
		}

	}else {
		limitPage= 10
	}

	res, err := tu.tr.ListAllTransactionRepo(c, sub, sdDate, edDate, searchFilt, order, sort, pg, limitPage)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (tu TransactionUsecaseImpl) TopUpUsecase(c context.Context, req entity.TopUpBody, sub string) error {
	var err error
	var min, max int64
	min = 50000
	max = 10000000
	minValue := decimal.NewFromInt(min)
	maxValue := decimal.NewFromInt(max)

	if !req.Amount.GreaterThanOrEqual(minValue) {
		e := fmt.Sprintf("minimal top up is %d", min)
		return &entity.CustomError{Msg: constant.TopUpProblem{Msg: e} , Log: errors.New(e)}
	} 

	if !req.Amount.LessThanOrEqual(maxValue) {
		e := fmt.Sprintf("maximum top up is %d", max)
		return &entity.CustomError{Msg: constant.TopUpProblem{Msg: e}, Log: errors.New(e)}
	}


	if err != nil {
		return err
	}

	txErr := tu.txr.WithTx(c, func(c context.Context) error {
		if err = tu.tr.TopupTransactionRepo(c, req, sub); err != nil {
			return err
		}
		return nil
	})

	if txErr != nil {
		return txErr
	}
	return nil
}

func (tu TransactionUsecaseImpl) TransferUsecase(c context.Context, req entity.TransferBody, userToken string) error {
	var err error

	var min, max int64
	min = 1000
	max = 50000000
	minValue := decimal.NewFromInt(min)
	maxValue := decimal.NewFromInt(max)

	if !req.Amount.GreaterThanOrEqual(minValue) {
		e := fmt.Sprintf("minimal top up is %d", min)
		return &entity.CustomError{
			Msg: constant.FailedToTransfer{
				Msg: errors.New(e).Error()}, 
				Log: errors.New(e),
			}
	}

	if !req.Amount.LessThanOrEqual(maxValue) {
		e := fmt.Sprintf("maximum top up is %d", max)
		return &entity.CustomError{
			Msg: constant.FailedToTransfer{
				Msg: errors.New(e).Error()}, 
				Log: errors.New(e),
			}
	}

	txErr := tu.txr.WithTx(c, func(c context.Context) error {
		if err = tu.tr.TransferTransactionRepo(c, req, userToken); err != nil {
			return err
		}
		return nil
	})

	if txErr != nil {
		return txErr
	}
	return nil
}

func (tu TransactionUsecaseImpl) ListAllUsersUsecase(c context.Context, email string, search string, page string) (*entity.ListAllUsersResponse, error){

	var pg int
	var err error
	if page != "" {
		pg, err = strconv.Atoi(page)
		 if err != nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		 }
	}else {
		pg = 1
	}

	res, err := tu.tr.ListAllUsersRepo(c, email, search, pg)

	if err != nil {
		return nil, err
	}

	return res, nil
}