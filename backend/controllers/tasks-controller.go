package controllers

import (
	"fmt"
	"log"
	"strconv"

	"github.com/bvrtula/task-manager/database"
	"github.com/bvrtula/task-manager/models"
	"github.com/gofiber/fiber/v2"
)

func CreateTask(c *fiber.Ctx) error {
	// PARSE DATA
	var t models.Task
	err := c.BodyParser(&t)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
			"body":  string(c.Body()),
		})
	}

	// CHECK IF TASK EXIST IN DB
	var DBTask models.Task
	database.DB.Where("title = ?", t.Title).First(&DBTask)
	if DBTask.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "This task already exists in database",
		})
	}

	// CREATE TASK
	err = database.DB.Create(&t).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Falied to create task",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": "task has been created",
	})
}

func GetTasks(c *fiber.Ctx) error {
	tasks := []models.Task{}
	err := database.DB.Find(&tasks).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Falied to get tasks",
		})
	}
	return c.Status(fiber.StatusOK).JSON(tasks)
}

func EditTask(c *fiber.Ctx) error {
	// GET PARAM AND CONVERT TO INT
	param := c.Params("id")
	id, err := strconv.Atoi(param)
	if err != nil {
		log.Fatal(err)
	}

	// FIND TASK TO UPDATE
	var t models.Task
	err = database.DB.Where("id = ?", id).First(&t).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fmt.Sprintf("Falied to get task with id: %v", id),
		})
	}

	// GET THE UPDATED DATA FROM BODY
	var updatedTask models.Task
	err = c.BodyParser(&updatedTask)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
			"body":  string(c.Body()),
		})
	}

	// UPDATE DATA IN DATABASE
	err = database.DB.Model(&t).Updates(models.Task{
		Title:       updatedTask.Title,
		Description: updatedTask.Description,
		Deadline:    updatedTask.Deadline,
		Priority:    updatedTask.Priority,
		Category:    updatedTask.Category,
	}).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fmt.Sprintf("Falied to update task with id: %v", id),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"succesfully updated": updatedTask,
	})
}

func DeleteTask(c *fiber.Ctx) error {
	// GET PARAM AND CONVER TO INT
	param := c.Params("id")
	id, err := strconv.Atoi(param)
	if err != nil {
		log.Fatal(err)
	}

	// CHECK IF USER WITH GIVEN ID EXISTS

	// DELETE TASK WITH GIVEN ID
	var t models.Task
	err = database.DB.Where("id = ?", id).Delete(&t).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fmt.Sprintf("Falied to delete task with id: %v", id),
		})
	}

	return c.Status(fiber.StatusOK).JSON(
		fmt.Sprintf("succesfully deleted task with id: %v", id),
	)
}
