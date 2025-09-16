package handler

import (
	"ewallet/constant"
	"ewallet/dto"
	"ewallet/entity"
	"ewallet/usecase"
	"io"
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



func (uh UserHandlerImpl) UserRegisterHandler(c *gin.Context) {
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

	err = uh.uuc.RegisterUsecase(c, req)

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

func (uh UserHandlerImpl) ReqResetPassHandler(c *gin.Context) {
	var reqBody dto.ResetReqPassBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(&entity.CustomError{Msg: constant.FailedJson{Msg: constant.JsonBad.Error()}, Log: err}).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.ResetReqPassBody{
		Email: reqBody.Email,
	}

	rawLog, customError := uh.uuc.ReqResetPassUsecase(c, req)

	if customError != nil {
		c.Error(customError).SetType(gin.ErrorTypePublic)
		return
	}

	resLog := dto.ResetReqPassResponse(*rawLog)

	res := dto.Response{
		Success: true,
		Error:   nil,
		Data:    resLog,
	}
	c.JSON(http.StatusOK, res)

}

func (uh UserHandlerImpl) UpdateResetPassHandler(c *gin.Context) {
	passToken := c.Query("tkn")
	var reqBody dto.ResetPassBody
	err := c.ShouldBindBodyWithJSON(&reqBody)

	if err != nil {
		c.Error(&entity.CustomError{Msg: constant.FailedJson{Msg: constant.JsonBad.Error()}, Log: err}).SetType(gin.ErrorTypePublic)
		return
	}

	req := entity.ResetPassBody{
		Token:       passToken,
		NewPassword: reqBody.NewPassword,
	}

	customError := uh.uuc.UpdatePassUsecase(c, req)

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

func (uh UserHandlerImpl) UserShowUserDetailsHandler(c *gin.Context) {
	token, exist := c.Get("subject")

	if !exist {
		c.Error(
			&entity.CustomError{
				Msg: constant.TokenProblem{
					Msg: constant.JwtTokenInvalid.Error()}, 
				Log: constant.JwtTokenInvalid}).SetType(gin.ErrorTypePublic)
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

func (uh UserHandlerImpl)UserIncomeHandler(c *gin.Context) {
	token, _ := c.Get("subject")

	res, err := uh.uuc.UserIncomeUsecase(c, token.(string))

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
	}

	resBody := dto.UserIncomeRes(*res)

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error: nil,
		Data: resBody,
	})
	
}

func (uh UserHandlerImpl) UserExpenseHandler(c *gin.Context ) {

	token, _ := c.Get("subject")

	res, err := uh.uuc.UserExpenseUsecase(c, token.(string))

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
	}

	resBody := dto.UserExpenseRes(*res)

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error: nil,
		Data: resBody,
	})
}

func (uh UserHandlerImpl) UserChangeProfilePicHandler(c *gin.Context) {
	email, _ := c.Get("subject")

	req, err := c.FormFile("profile_pic")

	if err != nil {
		msg := &entity.CustomError{Msg: constant.ChangeProfilePictureProblem{Msg: constant.JsonBad.Error()}, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}

	if req.Size > int64(constant.ProfileImageSize) {
		msg := &entity.CustomError{Msg: constant.ChangeProfilePictureProblem{Msg: constant.InvalidImageSize.Error()}, Log: constant.InvalidImageSize}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}

	file, err := req.Open()
	
	if err != nil {
		msg := &entity.CustomError{Msg: constant.ChangeProfilePictureProblem{Msg: constant.JsonBad.Error()}, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}
	defer file.Close()

	buff := make([]byte, 512)

	 _, err = file.Read(buff)

	if err != nil {
		msg := &entity.CustomError{Msg: constant.CommonError, Log: err}
		c.Error(msg).SetType(gin.ErrorTypePublic)
		return
	}

	file.Seek(0, io.SeekStart)
	fileType := http.DetectContentType(buff)

	reqBody := entity.ChangeProfilePictureBody{
		ImgFile:  file,
		ContentType: fileType,
		UserId: email.(string),
	}

	res, err := uh.uuc.UserChangeProfilePicUsecase(c, reqBody)

	resBody := dto.ChangeProfilePictureRes(*res)
	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error: nil,
		Data: resBody,
	})
}

func (uh UserHandlerImpl)GetUserGachaChanceHandler( c*gin.Context) {

	email := c.Value("subject").(string)

	res, err := uh.uuc.GetUserGachaChanceUsecase(c, email)

	if err != nil {
		c.Error(err).SetType(gin.ErrorTypePublic)
		return
	}

	resBody := dto.UserGachaChanceRes(*res)

	c.JSON(http.StatusOK, dto.Response{
		Success: true,
		Error: nil,
		Data: resBody,
	})
}