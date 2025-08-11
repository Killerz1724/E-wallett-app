package dto

type Response struct {
	Success bool
	Error   string
	Data    interface{}
}

type Error struct {
	Field   string
	Message string
}