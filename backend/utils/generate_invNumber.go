package utils

import (
	"ewallet/constant"
	"ewallet/entity"

	gonanoid "github.com/matoous/go-nanoid/v2"
)
func GenerateInvNumber() (string, error) {
	id,err := gonanoid.New(8)
	newUid := "INV-" + id

	if err != nil {
		customErr := &entity.CustomError{Msg: constant.CommonError, Log: err}
		return "", customErr
	}
	
	return newUid, nil
}