package middleware

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CorsMiddleware() gin.HandlerFunc {
	
		config := cors.Config{
			AllowOrigins: []string{os.Getenv("SERVER_ADDRESS1"),os.Getenv("SERVER_ADDRESS2")},
			AllowMethods: []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
			AllowHeaders: []string{"Content-Type", "Authorization"},
		}
		return cors.New(config)
	


}