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
        //console.log("onclick: " + profileClicked)
        setProfileClicked(profileClicked)
    }

    const removePopup = (event,clickOnprofileElement) => {
        let k=clickOnprofileElement.isSameNode(event.target)
        console.log(profileClicked);
        if(!k && profileClicked) {
            console.log('entered stage 2');
            setProfileClicked(false)
        }
    }

    useEffect(() => {
        const clickOnprofileElement = document.getElementById('profilePic');
        document.addEventListener('mouseup',(event) => {
            removePopup(event,clickOnprofileElement);   
        })
    },[])
    
    

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