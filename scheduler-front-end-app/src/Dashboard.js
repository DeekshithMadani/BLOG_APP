import React from 'react';
import { useEffect, useState } from 'react';
import Blogs from './Blogs';
import FixedHeader from './Fixed_Header';
import LeftSideBar from './LeftSideBar';
import './Dashboard.css';
import RightSideBar from './RightSideBar';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogData, setBlogData] = useState({});
    const [isError, setisError] = useState(false);
    const [isChecked, setIsChecked] = useState([]);
    const [starred, setStarred] = useState(false);
    const [trash, setTrash] = useState(false);

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/dashboard/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                uname: localStorage.getItem('username')
            }
        });

        const tempblogData = await response.json();
        if (tempblogData.status === 'ok') {
            setBlogData(tempblogData);
            if (!starred && !trash) {
                if (tempblogData.data.length > 0) {
                    setIsChecked(tempblogData.data.filter((blog) => !blog.trash).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
            else if (starred) {
                if (tempblogData.data.filter((blog) => blog.starred).length > 0) {
                    setIsChecked(tempblogData.data.filter((blog) => blog.starred).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
            else {
                if (tempblogData.data.length > 0) {
                    setIsChecked(tempblogData.data.filter((blog) => blog.trash).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }

            setIsLoading(false);
        }
        else {
            setisError(true);
            setIsLoading(false);
        }

    }

    const removeBlog = async (id, uname) => {
        const deleteresponse = await fetch('http://localhost:5000/dashboard/deleteblog', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, uname })
        });

        const deleteresponsedata = await deleteresponse.json();

        if (deleteresponsedata.status === 'ok') {
            setBlogData(deleteresponsedata)
            if (!starred && !trash) {
                if (deleteresponsedata.data.length > 0) {
                    setIsChecked(deleteresponsedata.data.filter((blog) => !blog.trash).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
            else if (starred) {
                if (deleteresponsedata.data.filter((blog) => blog.starred).length > 0) {
                    setIsChecked(deleteresponsedata.data.filter((blog) => blog.starred).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
            else {
                if (deleteresponsedata.data.length > 0) {
                    setIsChecked(deleteresponsedata.data.filter((blog) => blog.trash).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
        }
    }

    const updateStarred = async (id, uname, blogstarredflag) => {
        const updatestarredblogresponse = await fetch('http://localhost:5000/dashboard/updatestarredblog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, uname, blogstarredflag })
        });

        const updatestarredblogdata = await updatestarredblogresponse.json();

        if (updatestarredblogdata.status === 'ok') {
            setBlogData(updatestarredblogdata)
            if (!starred && !trash) {
                if (updatestarredblogdata.data.length > 0) {
                    setIsChecked(updatestarredblogdata.data.filter((blog) => !blog.trash).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
            else if (starred) {
                if (updatestarredblogdata.data.filter((blog) => blog.starred).length > 0) {
                    setIsChecked(updatestarredblogdata.data.filter((blog) => blog.starred).map((blog) => { return blog._id }))
                }
                else {
                    setIsChecked([])
                }
            }
        }
    }

    useEffect(() => { fetchData() }, [starred, trash])


    return isLoading ? 'Loading' : isError ? <div className='dashBoardBody'>
        <FixedHeader /><LeftSideBar setStarred={setStarred} setTrash={setTrash} /><RightSideBar blogData={blogData} isChecked={isChecked} setIsChecked={setIsChecked} />
        <h1>Error in fetching blogs</h1></div> : blogData.data.length === 0 ? <div className='dashBoardBody'>
            <FixedHeader /><LeftSideBar setStarred={setStarred} setTrash={setTrash} /><RightSideBar blogData={blogData} isChecked={isChecked} setIsChecked={setIsChecked} /><h1>No blogs to display</h1></div> : <div className='dashBoardBody'>
        <FixedHeader />

        <LeftSideBar setStarred={setStarred} setTrash={setTrash} />

        {!starred && !trash ? <RightSideBar blogData={{ status: 'ok', data: blogData.data.filter((blog) => !blog.trash) }} isChecked={isChecked} setIsChecked={setIsChecked} />
            : starred ? <RightSideBar blogData={{ status: 'ok', data: blogData.data.filter((blog) => blog.starred) }} isChecked={isChecked} setIsChecked={setIsChecked} />
                : <RightSideBar blogData={{ status: 'ok', data: blogData.data.filter((blog) => blog.trash) }} isChecked={isChecked} setIsChecked={setIsChecked} />
        }

        {!starred && !trash ? blogData.data.filter((blog) => !blog.trash).filter((blog) => isChecked.includes(blog._id)).map((blog) => <Blogs key={blog._id} pk={blog._id} removeBlog={removeBlog} uname={blog.uname} authorName={blog.authorName} uploadTime={blog.uploadTime} preface={blog.preface} content={blog.content} trash={trash} updateStarred={updateStarred} blogStarred={blog.starred}/>)
            : starred ? blogData.data.filter((blog) => blog.starred).filter((blog) => isChecked.includes(blog._id)).map((blog) => <Blogs key={blog._id} pk={blog._id} removeBlog={removeBlog} uname={blog.uname} authorName={blog.authorName} uploadTime={blog.uploadTime} preface={blog.preface} content={blog.content} trash={trash} updateStarred={updateStarred}  blogStarred={blog.starred}/>)
                : blogData.data.filter((blog) => blog.trash).filter((blog) => isChecked.includes(blog._id)).map((blog) => <Blogs key={blog._id} pk={blog._id} removeBlog={removeBlog} uname={blog.uname} authorName={blog.authorName} uploadTime={blog.uploadTime} preface={blog.preface} content={blog.content} trash={trash} />)}
    </div>
}

export default Dashboard;