import React from 'react';
import { useState, useReducer } from 'react';
import './CreateBlog.css';
import { Link } from 'react-router-dom';

const defaultState = {
    isModalOpen: false,
    modalContent: ''
}

const reducer = (state, action) => {
    if (action.type === 'show_modal') {
        return { isModalOpen: true, modalContent: action.payload }
    }
    if (action.type === 'close_modal') {
        return { isModalOpen: false, modalContent: '' }
    }
}

const Modal = ({ modalContent, closeModal }) => {
    setTimeout(() => { closeModal() }, 3000)
    return <p className='Modal'>
        *{modalContent}
    </p>

}

const CreateBlog = () => {
    const [preface, setPreface] = useState('');
    const [content, setContent] = useState('');
    const [state, dispatch] = useReducer(reducer, defaultState);

    const closeModal = () => {
        dispatch({ type: 'close_modal' });
    }

    const AddBlogData = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/dashboard/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: localStorage.getItem('username'),
                uploadTime: new Date().toLocaleString("sv-SE"),
                preface: preface,
                content: content
            })
        });

        const respStatus = await response.json();
        if (respStatus.status === 'ok') {
            dispatch({ type: 'show_modal',payload:'Blog uploaded successfully' });
            setContent('');
            setPreface('');
        }
        else {
            dispatch({ type: 'show_modal',payload:'A error ocurred. Please take backup and try after sometime' });
        }

    }

    return <div className='body'>
        {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal} />}
        <div className='createblogpage'>
            <form onSubmit={AddBlogData}>
                <label htmlFor='preface' className='label'>PREFACE: </label>
                <input name='preface' type='text' placeholder='Enter Preface' className='prefaceInp' maxLength="50" value={preface} onChange={(e) => { setPreface(e.target.value) }} required />
                <br />
                <div className='alignItem'>
                    <label htmlFor='content' className='label'>CONTENT: </label>
                    <textarea name="content" placeholder='Enter Content' className='contentInp' rows={10} cols={100} value={content} onChange={(e) => { setContent(e.target.value) }} required />
                </div>
                <br />
                <button className='submitBtn'>Submit</button>
            </form>
        </div>
        <br/>
        <br/>
        <Link to='/dashboard'>Back to dashboard</Link>
    </div>
}

export default CreateBlog;