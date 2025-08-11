package entity

type LoginBody struct {
	Email    string
	Password string
}

type RegisterBody struct {
	Email    string
	Password string
	Username string
}