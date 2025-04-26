import React from 'react'
import "./Navbar.scss";
import {Link, NavLink, useLocation} from 'react-router';

const Navbar = () => {

    const location = useLocation();

    //gets current path to keep "Projects" tab active, if conditions met
    //in my case it's written too hard because projects tab is a home page of my project
    //In normal case I would check if path name includes "/projects" 
    const isProjectActive = location.pathname === "/" || location.pathname === "/create-project";
    
    const isVacanciesActive = location.pathname.includes("/vacancies");


  return (
    <aside className="navbar">
        <div className="links">
            <Link className={`link`}>Main page</Link>
            <NavLink className={`link ${isProjectActive ? "active" : ""}`} to={"/"}>Projects</NavLink>
            <NavLink className={`link ${isVacanciesActive ? "active" : ""}`} to={"/1/vacancies"}>Vacancies</NavLink>
            <Link className={`link`}>People</Link>
            <Link className={`link`}>Tests</Link>
            <Link className={`link`}>Settings</Link>
        </div>

        <button className='logout-btn'>Log out</button>
    </aside>
  )
}

export default Navbar