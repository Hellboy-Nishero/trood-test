import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVacancies = createAsyncThunk(
    "project/fetchVacancies",
    async (id) => {
        //gets vacancies of project from database
        const data = await fetch(`/api/projects/${id}/vacancies`).then(res => res.json()); //explaining to this URL-name is in my vite.config.js
        

        return data;
    }
)