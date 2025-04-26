import React from 'react'
import "./Header.scss";
import { MessageSquare, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
        <h2 className="logo">trood community</h2>
        <div className="user-controlls">
            <MessageSquare className='icon' />
            <Bell className='icon' />
            <div className="user">
                <div className="user-icon"></div>
                <div className="user-name">Alex Smith</div>
            </div>
        </div>
    </header>
  )
}

export default Header