package handler

import (
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"ewallet/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TransactionHandlerImpl struct {
	tu usecase.TransactionUsecaseItf
}

func NewTransactionHandler(tu usecase.TransactionUsecaseItf) TransactionHandlerImpl {
	return TransactionHandlerImpl{
		tu: tu,
	}
}

func (th TransactionHandlerImpl) ListAllTransactionHandler(c *gin.Context) {
	paramId, _ := c.Get("subject")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")
	sort := c.QueryArray("sort_by")
	order := c.QueryArray("order_by")
	page := c.Query("page")
	limitPage := c.Query("limit")
	searchFilt := c.Query("search")

	rawLog, customError := th.tu.ListAllTransactionUsecase(c, paramId.(string), startDate, endDate, searchFilt, order, sort, page, limitPage)

	if customError != nil {
		c.Error(customError).SetType(gin.ErrorTypePublic)
		return
	}

	var resLog dto.ListTransactionResponse

	resLog.PageInfo = dto.PageInfo(rawLog.PageInfo)

	var dtoTrans []dto.Transaction
	for _, dat := range rawLog.Transactions {
		dtoTran := dto.Transaction(dat)

		dtoTrans = append(dtoTrans, dtoTran)
	}

	resLog.Transactions = dtoTrans

	res := dto.Response{
		Success: true,
		Error:   nil,
		Data:    resLog,
	}

	c.JSON(http.StatusOK, res)
}

func (th TransactionHandlerImpl) TopUpHandler(c *gin.Context) {
	paramId, _ := c.Get("subject")

	var reqBody dto.TopUpBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(&entity.CustomError{Msg: constant.FailedJson{Msg: constant.JsonBad.Error()}, Log: err}).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.TopUpBody(reqBody)

	customError := th.tu.TopUpUsecase(c, req, paramId.(string))

	if customError != nil {
		c.Error(customError)
		return
	}

	res := dto.Response{
		Success: true,
		Error:   nil,
		Data:    nil,
	}

	c.JSON(http.StatusOK, res)

}

func (th TransactionHandlerImpl) TransferHandler(c *gin.Context) {
	paramId := c.Value("subject")

	subject := paramId.(string)

	var reqBody dto.TransferBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(&entity.CustomError{Msg: constant.FailedJson{Msg: constant.JsonBad.Error()}, Log: err}).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.TransferBody(reqBody)

	customError := th.tu.TransferUsecase(c, req, subject)

	if customError != nil {
		c.Error(customError)
		return
	}

	res := dto.Response{
		Success: true,
		Error:   nil,
		Data:    nil,
	}

	c.JSON(http.StatusOK, res)

}
