package main

import (
	"ewallet/database"
	"ewallet/handler"
	"ewallet/middleware"
	"ewallet/repository"
	"ewallet/usecase"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	db, err := database.InitializeDatabase()

	if err != nil {
		log.Fatalln(err)
		return
	}

	r := gin.New()
	r.ContextWithFallback = true
	r.Use(middleware.Logger())
	r.Use(middleware.ErrorMiddleware())
	r.Use(middleware.CorsMiddleware())

	ur := repository.NewUserRepo(db)
	uuc := usecase.NewUserUsecase(ur)
	uh := handler.NewUserHandler(uuc)

	{
		auth := r.Group("/api/auth")
		auth.POST("/login", uh.UserLoginHandler)
		auth.POST("/register", uh.UserHandlerRegister)
	}
	{
		profile := r.Group("/api/profile")
		profile.Use(middleware.AuthMiddleware())
		profile.GET("/me", uh.UserShowUserDetailsHandler)
	}


	srv := &http.Server{
		Addr: ":" + os.Getenv("SERVER_PORT"),
		Handler: r.Handler(),
	}

	log.Println("Listening on port: " + os.Getenv("SERVER_PORT"))

	err = srv.ListenAndServe()

	if err != nil {
		log.Fatalln(err)
		return
	}

	defer db.Close()

}