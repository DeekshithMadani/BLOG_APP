import React, { useState } from 'react';
import './Blogs.css';

const Blogs = (props) => {
    const [starClicked,setStarClicked] = useState(props. blogStarred);

    const handleDeleteBlog = (id,uname) => {
        props.removeBlog(id,uname)
    }

    const handleStarred = (id,uname) => {
        setStarClicked(!starClicked)
        props.updateStarred(id,uname,!starClicked);
    }

    const handleRecoverBlog = (id,uname) => {
        props.recoverBlog(id,uname)
    }
    
    return <div className='Blog'>
    <div className='header'>
        <p className='authorName'>{props.authorName}</p>
        <p className='uploadTime'>{props.uploadTime}</p>
        {props.trash || <span className={!starClicked?"fa fa-star notChecked":"fa fa-star checked"} onClick={() => {handleStarred(props.pk,props.uname)}}></span>}
        {!props.trash || <button onClick={() => {handleRecoverBlog(props.pk,props.uname)}} className='RecoverBlog'>Recover</button>}
        <button onClick={() => {handleDeleteBlog(props.pk,props.uname)}} className='deleteBlog'>Delete</button>
    </div>
    <div className='preface'>{props.preface}</div>
    <div className='content'>{props.content}</div>
</div>
}

export default Blogs;