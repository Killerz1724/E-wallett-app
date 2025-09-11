package handler

import (
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"ewallet/usecase"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ExchangesHandlerImpl struct{
	eu usecase.ExchangeRatesUsecaseItf
}

func NewExchangesHandler(eu usecase.ExchangeRatesUsecaseItf) ExchangesHandlerImpl {
	return ExchangesHandlerImpl{
		eu: eu,
	}
}

func (eh ExchangesHandlerImpl) GetExchangeDataHandler(c *gin.Context) {

	err := eh.eu.ExchangeRatesUseCase()

	if err !=nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return 
	}

	resMsg := dto.Response{
		Success: true,
	
	}

	c.JSON(http.StatusOK, resMsg)
}

func (eh ExchangesHandlerImpl) ExchangeCurrenyRatesHandler(c *gin.Context) {

	from := c.Query("from")
	to := c.Query("to")
	val := c.Query("value")

	convertVal, err := strconv.ParseFloat(val, 64)

	if err != nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}

	res, err := eh.eu.ExchangeCurrenyRatesUsecase(c, from, to, convertVal)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	resMsg := dto.Response{
		Success: true,
		Data: res,
	}

	c.JSON(http.StatusOK, resMsg)
}

func (eh ExchangesHandlerImpl)RatesHandler(c *gin.Context){
	countryCode := c.Query("country_code")
	page, err := strconv.Atoi(c.Query("page"))

	if err != nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}

	res, err := eh.eu.RatesUsecase(c, countryCode, page)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	var resBody dto.RatesResponse
	for _,val := range res.Rates  {
		resBody.Rates = append(resBody.Rates, dto.CountryInfo(val))
	}

	resBody.PageInfo = dto.PageInfo(res.PageInfo)

	resMsg := dto.Response{
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resMsg)
}

func (eh ExchangesHandlerImpl)CountryListHandler(c *gin.Context){

	res, err := eh.eu.CountryListUsecase(c)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	var resBody dto.CountryListResponse
	for _,val := range res.Countries  {
		resBody.Countries = append(resBody.Countries, dto.CountryInfoCode{CountryCode: val.CountryCode})
	}

	

	resMsg := dto.Response{
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resMsg)
}