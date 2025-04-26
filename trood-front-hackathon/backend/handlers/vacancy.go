package handlers

import (
	"net/http"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/troodinc/trood-front-hackathon/models"
)

var (
	vacancies     = make(map[int]models.Vacancy)
	nextVacancyID = 1
	vacancyMutex  sync.Mutex
)

// GetVacancies godoc
// @Summary Get all vacancies for a project
// @Description Retrieve all vacancies for a given project by project ID
// @Tags Vacancies
// @Accept  json
// @Produce  json
// @Param id path int true "Project ID"
// @Success 200 {array} models.Vacancy
// @Failure 404 {object} map[string]interface{} "Project not found"
// @Router /projects/{id}/vacancies [get]
func GetVacancies(c *gin.Context) {
	projectIDStr := c.Param("id")
	projectID, err := strconv.Atoi(projectIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	vacancyMutex.Lock()
	defer vacancyMutex.Unlock()

	var vacancyList []models.Vacancy
	for _, vacancy := range vacancies {
		if vacancy.ProjectID == projectID {
			vacancyList = append(vacancyList, vacancy)
		}
	}

	// Ensure an empty array is returned if no vacancies are found
	if len(vacancyList) == 0 {
		c.JSON(http.StatusOK, []models.Vacancy{})
		return
	}

	c.JSON(http.StatusOK, vacancyList)
}

// CreateVacancy godoc
// @Summary Create a new vacancy for a project
// @Description Create a new vacancy by providing the vacancy details and the project ID
// @Tags Vacancies
// @Accept  json
// @Produce  json
// @Param id path int true "Project ID"
// @Param vacancy body models.Vacancy true "Vacancy data"
// @Success 201 {object} models.Vacancy
// @Failure 404 {object} map[string]interface{} "Project not found"
// @Router /projects/{id}/vacancies [post]
func CreateVacancy(c *gin.Context) {
	projectIDStr := c.Param("id")
	projectID, err := strconv.Atoi(projectIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"error": "Invalid project ID"})
		return
	}

	var vacancy models.Vacancy
	if err := c.ShouldBindJSON(&vacancy); err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"error": "Invalid input"})
		return
	}

	vacancyMutex.Lock()
	defer vacancyMutex.Unlock()

	projectFound := false
	for _, project := range projects {
		if project.ID == projectID {
			projectFound = true
			break
		}
	}

	if !projectFound {
		c.JSON(http.StatusNotFound, map[string]interface{}{"error": "Project not found"})
		return
	}

	vacancy.ID = nextVacancyID
	nextVacancyID++
	vacancy.ProjectID = projectID
	vacancies[vacancy.ID] = vacancy

	c.JSON(http.StatusCreated, vacancy)
}

// EditVacancy godoc
// @Summary Edit an existing vacancy
// @Description Edit a vacancy by ID
// @Tags Vacancies
// @Accept  json
// @Produce  json
// @Param id path int true "Vacancy ID"
// @Param vacancy body models.Vacancy true "Updated vacancy data"
// @Success 200 {object} models.Vacancy
// @Failure 404 {object} map[string]interface{} "Vacancy not found"
// @Router /vacancies/{id} [put]
func EditVacancy(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"error": "Invalid vacancy ID"})
		return
	}

	var vacancy models.Vacancy
	if err := c.ShouldBindJSON(&vacancy); err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"error": "Invalid input"})
		return
	}

	vacancyMutex.Lock()
	defer vacancyMutex.Unlock()

	if existingVacancy, exists := vacancies[id]; exists {
		existingVacancy.Name = vacancy.Name
		existingVacancy.Description = vacancy.Description
		existingVacancy.Field = vacancy.Field
		existingVacancy.Country = vacancy.Country
		existingVacancy.Experience = vacancy.Experience
		vacancies[id] = existingVacancy

		c.JSON(http.StatusOK, existingVacancy)
	} else {
		c.JSON(http.StatusNotFound, map[string]interface{}{"error": "Vacancy not found"})
	}
}

// DeleteVacancy godoc
// @Summary Delete a vacancy by ID
// @Description Delete a vacancy by its ID
// @Tags Vacancies
// @Accept  json
// @Produce  json
// @Param id path int true "Vacancy ID"
// @Success 204 {object} map[string]interface{} "No Content"
// @Failure 404 {object} map[string]interface{} "Vacancy not found"
// @Router /vacancies/{id} [delete]
func DeleteVacancy(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"error": "Invalid vacancy ID"})
		return
	}

	vacancyMutex.Lock()
	defer vacancyMutex.Unlock()

	if _, exists := vacancies[id]; exists {
		delete(vacancies, id)

		c.JSON(http.StatusNoContent, map[string]interface{}{"message": "Vacancy deleted"})
	} else {
		c.JSON(http.StatusNotFound, map[string]interface{}{"error": "Vacancy not found"})
	}
}
