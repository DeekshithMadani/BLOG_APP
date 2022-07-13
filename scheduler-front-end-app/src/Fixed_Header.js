import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fixed_Header.css';
import profilePic from './images/profile-icon.png';
import Profile from './Profile';

const FixedHeader = () => {
    const [profileClicked, setProfileClicked] = useState(false);
    const navigate = useNavigate();

    const handleCreateSubmit = () => {
        navigate('/dashboard/create')
    }

    const handleAboutSubmit = () => {
        navigate('/dashboard/about')
    }

    const handleProfileClick = () => {
        setProfileClicked(!profileClicked)
    }

    const removePopup = (event) => {
        const clickOnprofileElement = document.getElementById('profilePic');
        if(!clickOnprofileElement.isSameNode(event.target) && profileClicked) {
            setProfileClicked(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup',removePopup)
        return () => {
            document.removeEventListener('mouseup',removePopup) 
        }
    })
    
    

    return <section className='FixedHeader'>
        <div className='LeftSection'>
            <p className='appName'>Blogs</p>
        </div>
        <div className='RightSection'>
            <button onClick={handleCreateSubmit} className='createBlog'>Create Blog</button>
            <button onClick={handleAboutSubmit} className='About'>About</button>
            <img src={profilePic} id='profilePic' alt='' onClick={handleProfileClick}/>
            {!profileClicked || <Profile />}
        </div>
    </section>
}

export default FixedHeader;