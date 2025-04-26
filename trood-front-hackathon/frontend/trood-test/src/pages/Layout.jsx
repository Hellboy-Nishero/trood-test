import React, { useEffect } from 'react'
import {Outlet} from 'react-router'
import { fetchProjects } from '../store/api/projectApi';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';

const Overlay = () => {
    const projects = useSelector(state => state.project.projects);
    const dispatch = useDispatch();

    //gets products from api if local storage is empty
    useEffect(() => {
        if(projects.length === 0){
            dispatch(fetchProjects());
        }
    }, []);

  return (
    <>
    <Header />
    <main className="main">
        <Navbar />
        <div className="main-content">
            <Outlet />
        </div>
    </main>
    </>
  )
}

export default Overlay;