package dto

import "github.com/shopspring/decimal"

type LoginBody struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterBody struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Username string `json:"username" binding:"required"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
}

type ResetReqPassBody struct {
	Email string `json:"email" binding:"required"`
}

type ResetReqPassResponse struct {
	Token string `json:"token"`
}

type ResetPassBody struct {
	NewPassword string `json:"new_password" binding:"required"`
}

type ShowUserProfileRes struct {
	ImgUrl   string          `json:"img_url"`
	Username string          `json:"username"`
	Email    string          `json:"email"`
	Balance  decimal.Decimal `json:"balance"`
	WalletNumber int         `json:"wallet_number"`
}

type UserIncomeRes struct {
	TotalIncome decimal.Decimal `json:"total_income"`
}

type UserExpenseRes struct {
	TotalExpense decimal.Decimal `json:"total_expense"`
}

type ChangeProfilePictureRes struct {
	ImgUrl string `json:"img_url"`
}