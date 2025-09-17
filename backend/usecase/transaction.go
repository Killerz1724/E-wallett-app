package usecase

import (
	"context"
	"crypto/rand"
	"errors"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/repository"
	"ewallet/utils"
	"fmt"
	"math/big"
	"strconv"
	"time"

	"github.com/shopspring/decimal"
)

type TransactionUsecaseItf interface {
	ListAllTransactionUsecase(context.Context, string, string, string, string, []string, []string, string, string) (*entity.ListTransactionResponse, error)
	TopUpUsecase(context.Context, entity.TopUpBody, string) error
	TransferUsecase(context.Context, entity.TransferBody, string) error
	ListAllUsersUsecase(context.Context,  string, string,  string) (*entity.ListAllUsersResponse, error)
	SourceOfFundsUsecase(context.Context) ([]*entity.SourceOfFundResponse, error)
	GetRewardsUsecase( context.Context) (*entity.RewardsResponse, error)
	GetGachaUsecase( context.Context, string) (*entity.Reward, error)
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
	min = constant.MIN_TOPUP_AMOUNT
	max = constant.MAX_TOPUP_AMOUNT
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



	txErr := tu.txr.WithTx(c, func(c context.Context) error {
		req.InvoiceNumber, err = utils.GenerateInvNumber()

		if err != nil {
			return err
		}

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
		req.InvoiceNumber, err = utils.GenerateInvNumber()

		if err != nil {
			return err
		}

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

func (tu TransactionUsecaseImpl) SourceOfFundsUsecase(c context.Context) ([]*entity.SourceOfFundResponse, error) {

	res, err := tu.tr.SourceOfFundsRepo(c)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (tu TransactionUsecaseImpl) GetRewardsUsecase(c context.Context) (*entity.RewardsResponse, error) {
 res, err := tu.tr.GetRewardsRepo(c)

 if err != nil {
	return  nil, err
 }

 return  res, nil
}

func (tu TransactionUsecaseImpl) GetGachaUsecase(c context.Context, email string) (*entity.Reward, error) {
	rewards, err := tu.tr.GetRewardsRepo(c)

	if err != nil {
		return nil, err
	}

	var selectedReward entity.Reward
	txErr := tu.txr.WithTx(c, func(c context.Context) error {
		//Update user gacha chance
		err = tu.tr.UserCheckGachaRepo(c, email)

		if err != nil {
			return err
		}
		

	maxNum :=  big.NewInt(int64(constant.TOTAL_PRIZES_WEIGHT))

	randomNum, err := rand.Int(rand.Reader, maxNum)


	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	
	tempVal := randomNum.Int64()
	var perSegmentDegree float32
	var accumulateDegree float32
	perSegmentDegree = float32(constant.CIRCLE_DEGREE) / float32(len(rewards.Rewards))
	
	for _,val := range rewards.Rewards {
		if tempVal - val.Prize_weight <=0 {

			selectedReward.Prize_id = val.Prize_id
			selectedReward.Prize_amount = val.Prize_amount
			selectedReward.Prize_angle = accumulateDegree
			break;
		}
		tempVal = tempVal - val.Prize_weight
		accumulateDegree += perSegmentDegree
	}

	err = tu.tr.UserGachaRewardRepo(c, email, selectedReward)

	if err != nil {
		return err
	}

	return  nil
	})
	
	if txErr != nil {
		return nil, txErr
	}

	
	return &selectedReward, nil
}