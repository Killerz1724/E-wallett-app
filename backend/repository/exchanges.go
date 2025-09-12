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
	RatesRepo(context.Context, string, int) (*entity.RatesResponse, error)
	CountryListRepo(context.Context) (*entity.CountryListResponse, error)
}

type ExchangeRatesRepoImpl struct {
	db *sql.DB
}

func NewExchangeRatesRepo(db *sql.DB) ExchangeRatesRepoImpl {
	return ExchangeRatesRepoImpl{db: db}
}

func (er ExchangeRatesRepoImpl) ExchangeRatesRepo(req entity.ExchangeRatesResponse) error {

	q := `
	TRUNCATE TABLE exchange_rates
	RESTART IDENTITY; `
	_, err := er.db.Exec(q)
	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	q = `
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

	_, err =er.db.Exec(q, params...)

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

func (er ExchangeRatesRepoImpl)RatesRepo(c context.Context, countryCode string, page int) (*entity.RatesResponse, error) {
	
	var USDFromCountry entity.CountryInfo
	fromRows := er.db.QueryRowContext(c, `
		SELECT target_currency, rate
		FROM exchange_rates
		WHERE target_currency = $1;
	` , countryCode)

	err := fromRows.Scan(&USDFromCountry.CountryCode, &USDFromCountry.Rates)

	if err != nil {
		return  nil, &entity.CustomError{
			Msg: 
			constant.ExchangesRateProblem{
			Msg: constant.InvalidExchangeRate.Error(),
		}, Log: err}
	}

	limit := 8
	offset := (page - 1) * limit
	q := `
	SELECT target_currency, rate
	FROM exchange_rates
	WHERE id > $1
	ORDER BY  id ASC
	LIMIT $2;
	`

	rows, err := er.db.QueryContext(c, q,  offset, limit,)
	if err != nil {
		return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var rates entity.RatesResponse

	for rows.Next() {
		var rate entity.CountryInfo
		err := rows.Scan(&rate.CountryCode, &rate.Rates)

		if err !=nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}

		rates.Rates = append(rates.Rates, rate)
		}
		rates.RatesFrom = USDFromCountry.Rates
		pageInfo := entity.PageInfo{
			CurrentPage: page,
			TotalRows:   len(rates.Rates),
			LimitDataPerPage: limit,
		}
		rates.PageInfo = pageInfo
		return &rates, nil
}

func (er ExchangeRatesRepoImpl)CountryListRepo(c context.Context) (*entity.CountryListResponse, error) {

	q := `
	SELECT target_currency 
	FROM exchange_rates
	ORDER BY target_currency ASC;
	`

	rows, err := er.db.QueryContext(c, q)

	if err != nil {
		return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	var countries entity.CountryListResponse
	for rows.Next() {
		var country entity.CountryInfoCode
		err := rows.Scan(&country.CountryCode)

		if err !=nil {
			return nil, &entity.CustomError{Msg: constant.CommonError, Log: err}
		}

		countries.Countries = append(countries.Countries, country)
	}

	return &countries, nil
}
