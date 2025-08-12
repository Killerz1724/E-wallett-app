package middleware

import (
	"errors"
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) < 1 {
			return
		}

		err := c.Errors[0]
		var ve validator.ValidationErrors

		if errors.As(err, &ve) {
			validationErrors := make([]dto.Error, 0)

			for _, fe := range ve {
				validationErrors = append(validationErrors, dto.Error{
					Field:   fe.Field(),
					Message: fe.Error(),
				})
			}
			if len(validationErrors) == 0 {
				c.JSON(http.StatusBadRequest, dto.Response{
					Success: false,
					Error:   constant.ValidationError.Error(),
					Data:    nil,
				})
				return
			}
			c.JSON(http.StatusBadRequest, dto.Response{
				Success: false,
				Error:   constant.ValidationError.Error(),
				Data:    nil,
			})
			return
		}

		var cerr *entity.CustomError
		if errors.As(err, &cerr) {

			c.Error(cerr.Log).SetType(gin.ErrorTypePrivate)
			switch {
				case errors.As(cerr.Msg, &constant.LoginErrorType{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   cerr.Msg.Error(),
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.RegisterErrorType{}):
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   cerr.Msg.Error(),
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.QueryErrorType{}):
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   cerr.Msg.Error(),
						Data:    nil,
					})
					return
				case	errors.As(cerr.Msg, &constant.TokenProblem{}) :
					c.JSON(http.StatusUnauthorized, dto.Response{
						Success: false,
						Error:   cerr.Msg.Error(),
						Data:    nil,
					})
					return 
				}
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error:   constant.CommonError.Error(),
		})
	}
}
