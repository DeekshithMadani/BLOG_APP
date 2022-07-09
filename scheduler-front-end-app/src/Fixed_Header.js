import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Fixed_Header.css';
import profilePic from './images/profile-icon.png'

const FixedHeader = () => {
    const navigate = useNavigate();
    const handleCreateSubmit = () => {
        navigate('/dashboard/create')
    }

    const handleAboutSubmit = () => {
        navigate('/dashboard/about')
    }

    return <section className='FixedHeader'>
        <div className='LeftSection'>
            <p className='appName'>Blogs</p>
        </div>
        <div className='RightSection'>
            <button onClick={handleCreateSubmit} className='createBlog'>Create Blog</button>
            <button onClick={handleAboutSubmit} className='About'>About</button>
            <img src={profilePic} className='profilePic' alt=''/>
        </div>
    </section>
}

export default FixedHeader;