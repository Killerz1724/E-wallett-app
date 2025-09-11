package utils

import (
	"os"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	cost, err := strconv.Atoi(os.Getenv("COST_CRYPT"))

	if err != nil {
		return "", err
	}
	
	hash, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	return string(hash), err
}