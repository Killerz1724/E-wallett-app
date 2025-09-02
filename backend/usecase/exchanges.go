package usecase

import (
	"context"
	"encoding/json"
	"errors"
	"ewallet/constant"
	"ewallet/entity"
	"ewallet/repository"
	"fmt"
	"io"
	"net/http"
	"os"
)

type ExchangeRatesUsecaseItf interface {
	ExchangeRatesUseCase() error
	CheckRatesUseCase() (bool, error)
	ExchangeCurrenyRatesUsecase(context.Context, string, string, float64) (*entity.ExchangeCurrencyResponse, error)
	RatesUsecase(context.Context, string, int) (*entity.RatesResponse, error)
	CountryListUsecase(context.Context) (*entity.CountryListResponse, error)

}

type ExchangeRatesUsecaseImpl struct{
	er repository.ExchangeRatesRepoItf
}

func NewExchangeRatesUsecase(er repository.ExchangeRatesRepoItf) ExchangeRatesUsecaseImpl {
	return ExchangeRatesUsecaseImpl{er: er}
}

func (eu ExchangeRatesUsecaseImpl) ExchangeRatesUseCase() error{
	ExchangeId := os.Getenv("EXCHANGE_RATES_API_ID")
	url := fmt.Sprintf("https://openexchangerates.org/api/latest.json?app_id=%s", ExchangeId)
	res, err := http.Get(url)

	if err !=nil {

		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {

		return &entity.CustomError{Msg: constant.CommonError, Log: errors.New("status code not ok")}
	}

	//Read the response
	body, err := io.ReadAll(res.Body)

	if err !=nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var resBody entity.ExchangeRatesResponse

	if err := json.Unmarshal(body, &resBody); err !=nil {

		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	err = eu.er.ExchangeRatesRepo(resBody)

	if err !=nil {
		return err
	}

	return nil
}

func (eu ExchangeRatesUsecaseImpl) CheckRatesUseCase() (bool, error) {
	totalRows, err :=  eu.er.CheckRatesRepo()

	if totalRows > 0 || err !=nil {
		return true, err
	}
	return false, nil
}

func (eu ExchangeRatesUsecaseImpl) ExchangeCurrenyRatesUsecase(c context.Context, from string, to string, val float64) (*entity.ExchangeCurrencyResponse, error) {
	res, err:= eu.er.ExchangeCurrenyRatesRepo(c, from, to)

	if err !=nil {
		return nil, err
	}

	result := (res.To.Rates / res.From.Rates) * val


	updatedRes := &entity.ExchangeCurrencyResponse{
		To: entity.CountryInfo{
			CountryCode: res.To.CountryCode,
			Rates:       res.To.Rates/res.From.Rates,
		}, 
		From: entity.CountryInfo{
			CountryCode: res.From.CountryCode,
			Rates:       res.From.Rates/res.To.Rates,
		} , 
		Result: result,
	}

	return updatedRes, nil
}

func (eu ExchangeRatesUsecaseImpl)RatesUsecase(c context.Context, countryCode string, page int) (*entity.RatesResponse, error){
	var updatedRes entity.RatesResponse
	if (page < 1) {
		page = 1
	}
	res, err := eu.er.RatesRepo(c, countryCode, page)

	if err !=nil {
		return nil, err
	}

	for _,val := range res.Rates  {
		var rate entity.CountryInfo
		if val.CountryCode != countryCode {
			rate.CountryCode = val.CountryCode
			rate.Rates = (val.Rates/res.RatesFrom) * 1

			updatedRes.Rates = append(updatedRes.Rates, rate)
		}

	}

	updatedRes.PageInfo = res.PageInfo
	return &updatedRes, nil
}

func (eu ExchangeRatesUsecaseImpl)CountryListUsecase(c context.Context) (*entity.CountryListResponse, error) {
	res, err := eu.er.CountryListRepo(c)

	if err != nil {
		return nil, err
	}

	return res, nil
}