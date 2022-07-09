import React, { useState } from "react";
import './LeftSidebar.css';
import homeIcon from './images/home-icon.png';
import starIcon from './images/star-icon.png';
import trashIcon from './images/trash-icon.png';
import settingIcon from './images/setting-icon.jpg';
import logOut from './images/log-out.jpg';
import { useNavigate } from 'react-router-dom';

const LeftSideBar = ({setStarred,setTrash}) => {
    const navigate = useNavigate();
    const [toggleState, setToggleState] = useState('Home');

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleTabChange = (tab) => {
        setToggleState(tab)
        if(tab==='Home') {
            setStarred(false);
            setTrash(false);
        }
        else if(tab==='Starred') {
            setStarred(true);
            setTrash(false);
        } 
        else if(tab==='Trash') {
            setStarred(false);
            setTrash(true);
        }
        else {
            setStarred(false);
            setTrash(false);
        }
    }

    return <div className="leftsidebar">
        <div className="aboveSection">
            <div className={toggleState === 'Home' ? "option active-tab" : "option"} onClick={() => { handleTabChange('Home') }}>
                <img src={homeIcon} className='icon-img' />
                <section className="optionName">Home</section>
            </div>
            <div className={toggleState === 'Starred' ? "option active-tab" : "option"} onClick={() => { handleTabChange('Starred') }}>
                <img src={starIcon} className='icon-img' />
                <section className="optionName">Starred</section>
            </div>
            <div className={toggleState === 'Trash' ? "option active-tab" : "option"} onClick={() => { handleTabChange('Trash') }}>
                <img src={trashIcon} className='icon-img' />
                <section className="optionName">Trash</section>
            </div>
        </div>
        <div className="belowSection">
            <div className={toggleState === 'Settings' ? "option active-tab" : "option"} onClick={() => { handleTabChange('Settings') }}>
                <img src={settingIcon} className='icon-img' />
                <section className="optionName">Settings</section>
            </div>
            <div className="option" onClick={handleLogOut}>
                <img src={logOut} className='icon-img' />
                <section className="optionName">Logout</section>
            </div>


        </div>
    </div>
}

export default LeftSideBar