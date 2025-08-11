package middleware

import (
	"ewallet/logger"
	"time"

	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		now := time.Now()

		logger.SetLogrusLogger()

		c.Next()
		param := map[string]interface{}{
			"status_code": c.Writer.Status(),
			"method":      c.Request.Method,
			"latency":     time.Since(now),
			"path":        c.FullPath(),
		}

		privateLogged := false
		if c.Errors != nil {
			for _, err := range c.Errors {
				if err.Type == gin.ErrorTypePrivate{
					logger.Log.WithFields(param).Error(err.Error())
					privateLogged = true
				}
			}
			
		}

		if !privateLogged {
			logger.Log.WithFields(param).Info()
		}

	}
}
