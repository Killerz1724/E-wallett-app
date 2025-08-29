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

type ShowUserProfileRes struct {
	ImgUrl   string          `json:"img_url"`
	Username string          `json:"username"`
	Email    string          `json:"email"`
	Balance  decimal.Decimal `json:"balance"`
}

type UserIncomeRes struct {
	TotalIncome decimal.Decimal `json:"total_income"`
}