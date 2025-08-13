package handler

import (
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"ewallet/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)


type UserHandlerImpl struct {
	uuc usecase.UserUsecaseItf
}

func NewUserHandler(uuc usecase.UserUsecaseItf) UserHandlerImpl {
	return UserHandlerImpl{
		uuc: uuc,
	}
}



func (uh UserHandlerImpl) UserHandlerRegister(c *gin.Context) {
	var reqBody dto.RegisterBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.RegisterBody{
		Username: reqBody.Username,
		Email:    reqBody.Email,
		Password: reqBody.Password,
	}

	err = uh.uuc.UsecaseRegister(c, req)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	res := dto.Response{
		Success: true,
		Error:   nil,
	}

	c.JSON(http.StatusCreated, res)

}

func (uh UserHandlerImpl) UserLoginHandler(c *gin.Context) {
	var reqBody dto.LoginBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.LoginBody(reqBody)

	res, err := uh.uuc.UserLoginUsecase(c, req)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	resBody := dto.LoginResponse(*res)

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error:   nil,
		Data:    resBody,
	})
}

func (uh UserHandlerImpl) UserShowUserDetailsHandler(c *gin.Context) {
	token, exist := c.Get("subject")

	if !exist {
		c.Error(&entity.CustomError{Msg: constant.TokenProblem{Msg: constant.JwtTokenInvalid.Error()}, Log: constant.JwtTokenInvalid}).SetType(gin.ErrorTypePublic)
		return
	}
	res, err := uh.uuc.UserShowUserDetailsUsecase(c, token.(string))

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	resBody := dto.ShowUserProfileRes(*res)

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error: nil,
		Data: resBody,
	})
}