import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
    "project/fetchProjects",
    async () => {
        //gets projects from database
        const data = await fetch("/api/projects").then(res => res.json());  //explaining to this URL-name is in my vite.config.js

        return data;
    }
)