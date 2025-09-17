package entity

import (
	"io"

	"github.com/shopspring/decimal"
)

type LoginBody struct {
	Email    string
	Password string
}

type RegisterBody struct {
	Email    string
	Password string
	Username string
}

type LoginResponse struct {
	AccessToken string
}

type ResetReqPassBody struct {
	Email string
}

type ResetReqPassResponse struct {
	Token string
}

type ResetPassBody struct {
	Token       string
	NewPassword string
}

type ShowUserProfileRes struct {
	ImgUrl   string
	Username string
	Email    string
	Balance  decimal.Decimal
	WalletNumber int
}

type UserIncomeRes struct {
	TotalIncome decimal.Decimal
}

type UserExpenseRes struct {
	TotalExpense decimal.Decimal
}

type ChangeProfilePictureBody struct {
	ImgFile io.Reader
	ContentType string
	UserId string
}

type ChangeProfilePictureRes struct {
	ImgUrl string
}

type UserGachaChanceRes struct {
	Chance int
}