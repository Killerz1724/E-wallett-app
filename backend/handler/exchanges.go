package handler

import (
	"encoding/json"
	"errors"
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type ExchangesHandlerImpl struct{}

func NewExchangesHandler() ExchangesHandlerImpl {
	return ExchangesHandlerImpl{}
}

func (eh ExchangesHandlerImpl) GetExchangeDataHandler(c *gin.Context) {

	ExchangeId := os.Getenv("EXCHANGE_RATES_API_ID")
	url := fmt.Sprintf("https://openexchangerates.org/api/latest.json?app_id=%s", ExchangeId)
	res, err := http.Get(url)

	if err !=nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePrivate)
		return
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: errors.New("status code not ok")}
		c.Error(msg).SetType(gin.ErrorTypePrivate)
		return
	}

	//Read the response
	body, err := io.ReadAll(res.Body)

	if err !=nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePrivate)
		return
	}

	var resBody dto.ExchangeRatesRespon

	if err := json.Unmarshal(body, &resBody); err !=nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePrivate)
	}

	resMsg := dto.Response{
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resMsg)
}