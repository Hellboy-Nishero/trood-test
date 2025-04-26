import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects} from '../api/projectApi';
import { fetchVacancies } from "../api/vacancyApi";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: JSON.parse(localStorage.getItem("projects")) || [], //sets stored data if given, otherwise sets to empty array
        vacancies: JSON.parse(localStorage.getItem("vacancies")) || [] //the same principle here
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
            //stores projects into local storage
            localStorage.setItem("projects", JSON.stringify(state.projects));
        }),
        builder.addCase(fetchVacancies.fulfilled, (state, action) => {
            state.vacancies = action.payload
            //stores data in local storage
            localStorage.setItem("vacancies", JSON.stringify(state.vacancies));
        })
    }
})


export default projectSlice.reducer;