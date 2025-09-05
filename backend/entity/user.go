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

type ShowUserProfileRes struct {
	ImgUrl   string
	Username string
	Email    string
	Balance  decimal.Decimal
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