package dto

type ErrorResponse struct {
	Message string `json:"message" binding:"omitempty"`
}

type Response struct {
	Success bool           `json:"success"`
	Error   *ErrorResponse `json:"error" binding:"omitempty"`
	Data    interface{}    `json:"data" binding:"omitempty"`
}

type Error struct {
	Field   string
	Message string
}