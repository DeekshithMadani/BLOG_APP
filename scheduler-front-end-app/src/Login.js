import './Login.css';
import React, { useState, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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


const Login = () => {
    const [uname, setUname] = useState('');
    const [pwd, setPwd] = useState('');
    const [state, dispatch] = useReducer(reducer, defaultState);
    const navigate = useNavigate();
    let value = ''

    const closeModal = () => {
        dispatch({ type: 'close_modal' });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname,
                pwd,
            }),
        });

        const data = await response.json()

        value = data.comment;
        if (data.Login) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', uname);
            navigate('/dashboard');
        }
        else {
            dispatch({ type: 'show_modal', payload: value });
            setUname('');
            setPwd('');
        }

    };


    return (<div className='body'>
        {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal} />}
        <div className="container">
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="uname" className="heading">Username</label>
                <br />
                <input type="email" name="uname" placeholder="Enter Username" className="unamepwdtab" value={uname} onChange={(e) => { setUname(e.target.value) }} required />
                <br />
                <label htmlFor="pwd" className="heading">Password</label>
                <br />
                <input type="password" name="pwd" placeholder="Enter Password" className="unamepwdtab" value={pwd} onChange={(e) => { setPwd(e.target.value) }} required />
                <br />
                <button className="submitBtn">Submit</button>
                <p className="regLink">Not a user Register <Link to="/Register">here</Link></p>
            </form>
        </div>
    </div>
    );
}


export default Login;