import React from 'react'
import "./Projects.scss";
import { useSelector } from 'react-redux';
import ProjectList from '../../components/ProjectList/ProjectList';
import { useNavigate } from 'react-router';

const Projects = () => {

    const projects = useSelector(state => state.project.projects);

    const currentDate = new Date();

    const activeProjects = projects.filter(project => {
        const deadline = new Date(project.deadline.split(".").reverse().join("-"));
        return deadline >= currentDate;
    })

    const passedProjects = projects.filter(project => {
        const deadline = new Date(project.deadline.split(".").reverse().join("-"));
        return deadline < currentDate;
    })



    const navigate = useNavigate();

    const navigateToCreator = () => {
        navigate("create-project");
    }


  return (
    <>
        <div className="projects-header">
            <h3 className="section-title">Active projects</h3>
            <button className='btn' onClick={navigateToCreator}>Create project</button>
        </div>
        <div className="active-projects">
            <ProjectList projects={activeProjects} />
        </div>
        <h3 className="section-title">Passed projects</h3>
        <div className="passed-projects">
            <ProjectList projects={passedProjects} />
        </div>
    </>
  )
}

export default Projects