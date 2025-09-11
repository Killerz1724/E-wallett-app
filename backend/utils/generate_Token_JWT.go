package utils

import (
	"ewallet/constant"
	"ewallet/entity"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GeneratingJWTToken(sub string) (string, error) {

	// create the claims
	now := time.Now()
	registeredClaims := jwt.RegisteredClaims{
		Issuer:  os.Getenv("JWT_USER"),
		Subject: sub,
		IssuedAt: &jwt.NumericDate{
			Time: now,
		},
		ExpiresAt: &jwt.NumericDate{
			Time: now.Add(24 * time.Hour),
		},
		// Audience: jwt.ClaimStrings{"https://google.com", "https://yahoo.com"},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, registeredClaims)

	// sign the token
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", &entity.CustomError{
			Msg: constant.CommonError,
			Log: err,
		}
	}

	return tokenString, nil
}

func ExtractTokenSubject(tokenString string) (string, error) {
	var err error

	// err = godotenv.Load()
	// if err != nil {
	// 	cusErr := &entity.CustomError{Msg: constant.TokenProblem{Msg: constant.JwtTokenInvalid.Error()}, Log: err}
	// 	return "", cusErr
	// }
	token, err := jwt.Parse(
		tokenString,
		func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				cusErr := &entity.CustomError{Msg: constant.TokenProblem{Msg: constant.JwtTokenInvalid.Error()}, Log: err}
				return nil, cusErr
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		},
		// parser options
		jwt.WithIssuedAt(),
		jwt.WithIssuer(os.Getenv("JWT_USER")),
	)

	if err != nil {
		cusErr := &entity.CustomError{Msg: constant.TokenProblem{Msg: constant.JwtTokenInvalid.Error()}, Log: err}
		return "", cusErr
	}

	var sub string

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		sub, ok = claims["sub"].(string)

		if !ok {
			cusErr := &entity.CustomError{Msg: constant.TokenProblem{Msg: constant.JwtTokenInvalid.Error()}, Log: constant.JwtTokenSubject}
			return "", cusErr
		}

	}

	return sub, nil
}
