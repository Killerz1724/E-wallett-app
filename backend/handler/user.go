package handler

import (
	"ewallet/dto"
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


	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error:   nil,
	})
}
