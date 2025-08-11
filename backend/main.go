package main

import (
	"ewallet/database"
	"ewallet/handler"
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

	r := gin.Default()

	ur := repository.NewUserRepo(db)
	uuc := usecase.NewUserUsecase(ur)
	uh := handler.NewUserHandler(uuc)

	{
		auth := r.Group("/auth")
		auth.POST("/login", uh.UserLoginHandler)
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