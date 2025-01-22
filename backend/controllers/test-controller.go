package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Welcome(c *fiber.Ctx) error {
	user := c.Params("user")
	fmt.Println(user)
	return c.JSON(user)
}
