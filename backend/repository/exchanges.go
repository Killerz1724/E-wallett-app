package repository

import (
	"context"
	"database/sql"
	"ewallet/constant"
	"ewallet/entity"
	"fmt"
	"time"
)

type ExchangeRatesRepoItf interface {
	ExchangeRatesRepo(entity.ExchangeRatesResponse) error
	CheckRatesRepo() (int, error)
	ExchangeCurrenyRatesRepo(context.Context, string, string) (*entity.ExchangeCurrencyResponse, error)
}

type ExchangeRatesRepoImpl struct {
	db *sql.DB
}

func NewExchangeRatesRepo(db *sql.DB) ExchangeRatesRepoImpl {
	return ExchangeRatesRepoImpl{db: db}
}

func (er ExchangeRatesRepoImpl) ExchangeRatesRepo(req entity.ExchangeRatesResponse) error {

	q := `
	INSERT INTO exchange_rates(base_currency, target_currency, rate, rate_date) 
		VALUES
	`
	timestamp := int64(req.Timestamp)

	// Convert to time.Time (second precision)
	t := time.Unix(timestamp, 0).UTC()

	var params []any
	idx := 1
	dataLength := len(req.Rates)
	currentDat := 0
	for country, rate := range req.Rates {
		q += fmt.Sprintf("($%d, $%d, $%d, $%d)", idx, idx+1, idx+2, idx+3)
		params = append(params, req.Base, country, rate, t)
		idx += 4

		if currentDat < dataLength-1 {
			q += ","
			currentDat++
		} 
		
	}

	q += ";"

	_, err :=er.db.Exec(q, params...)

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	return nil
}

func (er ExchangeRatesRepoImpl) CheckRatesRepo() (int, error) {

	rows := er.db.QueryRow(`
		SELECT count(id)
		FROM exchange_rates;
	`)
	var totalRows int



	err := rows.Scan(&totalRows)
		

	if err != nil {
		return -1, &entity.CustomError{Msg: constant.CommonError, Log: err}
	}
	


	return totalRows, nil
}

func (er ExchangeRatesRepoImpl) ExchangeCurrenyRatesRepo(c context.Context,from string, to string) (*entity.ExchangeCurrencyResponse, error){

	var USDtoCountry, USDFromCountry entity.CountryInfo
	fromRows := er.db.QueryRowContext(c, `
		SELECT target_currency, rate
		FROM exchange_rates
		WHERE target_currency = $1
	` , from)

	err := fromRows.Scan(&USDFromCountry.CountryCode, &USDFromCountry.Rates)

	if err != nil {
		return  nil, &entity.CustomError{
			Msg: 
			constant.ExchangesRateProblem{
			Msg: constant.InvalidExchangeRate.Error(),
		}, Log: err}
	}

	toRows := er.db.QueryRowContext(c, `
		SELECT target_currency, rate
		FROM exchange_rates
		WHERE target_currency = $1 
	` , to)

	err = toRows.Scan(&USDtoCountry.CountryCode, &USDtoCountry.Rates)

	if err != nil {
		return  nil, &entity.CustomError{
			Msg: 
			constant.ExchangesRateProblem{
			Msg: constant.InvalidExchangeRate.Error(),
		}, Log: err}
	}

	return &entity.ExchangeCurrencyResponse{
		From:  USDFromCountry,
		To: USDtoCountry,
	}, nil
}