package models

type Vacancy struct {
	ID          int    `json:"id"`
	ProjectID   int    `json:"project_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Field       string `json:"field"`
	Country     string `json:"country"`
	Experience  string `json:"experience"`
}
