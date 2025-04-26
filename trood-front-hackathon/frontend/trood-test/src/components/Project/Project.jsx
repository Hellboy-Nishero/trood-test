import React from 'react';
import './Project.scss';
import { Link } from 'react-router';
import { MessageSquare, Bell, User, Clock } from 'lucide-react';

const Project = ({id, name, deadline}) => {
  return (
    <Link className="project-item" to={`/${id}`}>
        <div className="project-item__header">
            <h4 className="project-item__title">{name}</h4>
            <span className='project-item__deadline'><Clock className="icon" />Deadline: {deadline}</span>
        </div>
    <ul className='project-item__tasks'>
        <li className='project-item__task'>Finished creating visual for Facebook</li>
        <li className='project-item__task'>Finished creating visual for Facebook</li>
        <li className='project-item__task'>Finished creating visual for Facebook</li>
        <li className='project-item__task'>Finished creating visual for Facebook</li>
    </ul>
    <div className="project-item__footer">
        <div className="project-item__user">
            <User className='icon' />
            <h4 className='username'>Anna Lenram</h4>
        </div>
        <div className="project-item__icons">
            <MessageSquare className='icon' />
            <Bell className='icon' />
        </div>
    </div>
</Link>
  )
}

export default Project