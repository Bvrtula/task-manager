package controllers

import (
	"github.com/bvrtula/task-manager/database"
	"github.com/bvrtula/task-manager/models"
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	// PARSE FORM DATA
	var u models.User
	err := c.BodyParser(&u)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
			"body":  string(c.Body()),
		})
	}

	// CHECK IF EMAIL IS IN DATABASE
	var existingUser models.User
	database.DB.Where("email = ?", u.Email).First(&existingUser)
	if existingUser.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User with this email doesn't exist",
		})
	}

	// CHECK IF USER CREDENTIALS MATCHES WITH THE DB
	var DBUser models.User
	database.DB.Where("email = ?", u.Email).First(&DBUser)
	if (u.Email == DBUser.Email) && (u.Password == DBUser.Password) {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": "User can be logged in",
		})
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Wrong credentials",
		})
	}
}

func Register(c *fiber.Ctx) error {
	// PARSE FORM DATA
	var u models.User
	err := c.BodyParser(&u)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
			"body":  string(c.Body()),
		})
	}

	// CHECK IF USER EXISTS
	var existingUser models.User
	database.DB.Where("email = ?", u.Email).First(&existingUser)
	if existingUser.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	// CREATE THE USER
	err = database.DB.Create(&u).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(u)
}
