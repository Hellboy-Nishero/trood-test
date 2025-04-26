import React from 'react'
import "./ProjectList.scss";
import Project from '../Project/Project';

const ProjectList = ({projects}) => {
  return (
    <>
        {
            projects.length > 0
            ? projects.map(project => 
            <Project key={project.id} id={project.id} name={project.name} deadline={project.deadline} />
            )
            : <p className='empty-message'>No active projects</p>
        }
    </>
  )
}

export default ProjectList