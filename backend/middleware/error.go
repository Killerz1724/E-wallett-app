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
					Error:  &dto.ErrorResponse{
						Message: constant.ValidationError.Error(),
					},
					Data:    nil,
				})
				return
			}
			c.JSON(http.StatusBadRequest, dto.Response{
				Success: false,
				Error:   &dto.ErrorResponse{
					Message: constant.ValidationError.Error(),
				},
				Data:    nil,
			})
			return
		}

		var cerr *entity.CustomError
		if errors.As(err, &cerr) {

			c.Error(cerr.Log).SetType(gin.ErrorTypePrivate)
			switch {
			case	errors.As(cerr.Msg, &constant.FailedJson{}) :
				c.JSON(http.StatusBadRequest, dto.Response{
					Success: false,
					Error:   &dto.ErrorResponse{
						Message: cerr.Msg.Error(),
					},
					Data:    nil,
				})
				return
			
				case errors.As(cerr.Msg, &constant.LoginErrorType{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.RegisterErrorType{}):
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.QueryErrorType{}):
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.DataNotFound{}):
					c.JSON(http.StatusNotFound, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case	errors.As(cerr.Msg, &constant.TokenProblem{}) :
					c.JSON(http.StatusUnauthorized, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return 
				case	errors.As(cerr.Msg, &constant.TransactionProblem{}) :
					c.JSON(http.StatusInternalServerError, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case	errors.As(cerr.Msg, &constant.TopUpProblem{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case	errors.As(cerr.Msg, &constant.FailedToTransfer{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case	errors.As(cerr.Msg, &constant.ExchangesRateProblem{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return
				case errors.As(cerr.Msg, &constant.ChangeProfilePictureProblem{}) :
					c.JSON(http.StatusBadRequest, dto.Response{
						Success: false,
						Error:   &dto.ErrorResponse{
							Message: cerr.Msg.Error(),
						},
						Data:    nil,
					})
					return

				}
		}

		c.AbortWithStatusJSON(http.StatusInternalServerError, dto.Response{
			Success: false,
			Error:   &dto.ErrorResponse{
				Message: constant.CommonError.Error(),
			},
		})
	}
}
