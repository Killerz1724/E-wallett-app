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

	req := entity.TopUpBody{
		InvoiceNumber: "",
		Amount:        reqBody.Amount,
		SourceOfFund:  reqBody.SourceOfFund,
	}

	customError := th.tu.TopUpUsecase(c, req, paramId.(string))

	if customError != nil {
		c.Error(customError).SetType(gin.ErrorTypePublic)
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

	req := entity.TransferBody{
		InvoiceNumber: "",
		Amount:        reqBody.Amount,
		TargetWallet:  reqBody.TargetWallet,
		Description:   reqBody.Description,
	}

	customError := th.tu.TransferUsecase(c, req, subject)

	if customError != nil {
		c.Error(customError).SetType(gin.ErrorTypePublic)
		return
	}

	res := dto.Response{
		Success: true,
		Error:   nil,
		Data:    nil,
	}

	c.JSON(http.StatusOK, res)

}

func (th TransactionHandlerImpl) ListAllUsersHandler(c *gin.Context){

	subjectEmail := c.Value("subject").(string)
	searchParam := c.Query("search")
	pageQuery := c.Query("page")

	res, err := th.tu.ListAllUsersUsecase(c, subjectEmail, searchParam, pageQuery)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}
	
	var resBody  dto.ListAllUsersResponse

	resBody.PageInfo = dto.PageInfo(res.PageInfo)

	var dtoUsers []dto.Users
	for _, dat := range res.Users {
		dtoUsers = append(dtoUsers, dto.Users(dat))
	}

	if len(dtoUsers) == 0 {
		resBody.Users = []dto.Users{}
	} else {
		resBody.Users = dtoUsers
	}
	

	
	resJson := dto.Response {
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resJson)
}

func (th TransactionHandlerImpl) SourceOfFundsHandler(c *gin.Context) {

	res, err := th.tu.SourceOfFundsUsecase(c)

	if err !=nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	var resBody []dto.SourceOfFundResponse

	for _,val := range res {
		resBody = append(resBody, dto.SourceOfFundResponse(*val))
	}

	resJson := dto.Response {
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resJson)
}

func (th TransactionHandlerImpl) GetRewardsHandler(c *gin.Context) {

	res, err := th.tu.GetRewardsUsecase(c)

	if err !=nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}
	
	var resBody dto.RewardsResponse

	for _,val := range res.Rewards {
		var reward dto.Reward
		reward.Prize_id = val.Prize_id
		reward.Prize_amount = val.Prize_amount.BigInt().Int64()
		reward.Prize_weight = val.Prize_weight
		resBody.Rewards = append(resBody.Rewards, reward)
	}

	resJson := dto.Response {
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resJson)
	
}

func (th TransactionHandlerImpl) GetGachaHandler(c *gin.Context) {

	email := c.Value("subject").(string)

	res, err := th.tu.GetGachaUsecase(c, email)

	if err !=nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	resBody := dto.Reward{
		Prize_id: res.Prize_id,
		Prize_amount: res.Prize_amount.BigInt().Int64(),
		Prize_angle: &res.Prize_angle,
	}

	resJson := dto.Response {
		Success: true,
		Data: resBody,
	}

	c.JSON(http.StatusOK, resJson)

}
