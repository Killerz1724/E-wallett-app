package handler

import (
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

func (uh UserHandlerImpl) UserLoginHandler(c *gin.Context) {
	var reqBody dto.LoginBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.LoginBody(reqBody)

	err = uh.uuc.UserLoginUsecase(c, req)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error:   "",
	})
}
