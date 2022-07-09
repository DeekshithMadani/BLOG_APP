import React, { useState } from "react";
import './RightSidebar.css';
import SearchIcon from './images/search.svg';

const ListPreface = ({ preface, blogid, handleChange, isChecked }) => {

    return <>
        <div className="checkPreface">
            <input type="checkbox" className="selectPreface" name={blogid} onChange={handleChange} checked={isChecked.includes(blogid)?true:false} />
            <label htmlFor="selectPreface"> {preface}</label>
        </div>
    </>

}

const RightSideBar = ({ blogData, setIsChecked, isChecked }) => {

    const [searchPreface,setSearchPreface]=useState('');
    console.log(blogData)
    console.log(isChecked)


    const handleChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'selectAll') {
            if (event.target.checked) {
                setIsChecked(blogData.data.map((blog) =>  {return blog._id}))
            } else {
                setIsChecked([])
            }
        }
        else {
            if (event.target.checked) {
                if (!isChecked.includes(name)) {
                    setIsChecked(() => { return [...isChecked, name] })
                }
            } else {
                setIsChecked(() => { return isChecked.filter((blogids) => blogids != name) })
            }
        }
    }


    return <div className="rightsidebar">
        <div className="searchPrefaceBar">
            <input type='text' placeholder="search preface" className="searchText" value={searchPreface} onChange={(e)=>{setSearchPreface(e.target.value)}} />
            <img src={SearchIcon} className='Searchicon' />
        </div>
        <div className="selectAllContainer">
            <input type="checkbox" className="selectAll" name='selectAll' checked={blogData.data.length === isChecked.length ? true:false } onChange={handleChange} />
            <label htmlFor="selectAll"> Select All </label>
        </div>
        <div className="prefaceScrollBar">
            {blogData.data.filter((blog) => blog.preface.includes(searchPreface)).map((blog) => <ListPreface key={blog._id} preface={blog.preface} blogid={blog._id} handleChange={handleChange} isChecked={isChecked} />)}
        </div>
    </div>
}

export default RightSideBar;