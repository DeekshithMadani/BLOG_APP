import './Register.css';
import { useState, useReducer } from 'react';
import {useNavigate} from 'react-router-dom';

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

function Register() {
  const [uname, setUname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pwd, setPwd] = useState('');
  const [repwd, setRepwd] = useState('');
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, defaultState);
  let value = '';

  const closeModal = () => {
    dispatch({ type: 'close_modal' });
  }

  const validate_pwd = () => {
    if (pwd !== repwd) {
      return false
    }
    else {
      return true
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate_pwd()) {
      value = 'Enter correct value in re enter password';
    }
    else {
      const response = await fetch('http://localhost:5000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname, pwd, firstName, lastName
        }),
      });

      const data = await response.json();
      value = data.comment;
      setUname('');
      setFirstName('');
      setLastName('');
      setPwd('');
      setRepwd('');
      if (data.Registered){
        navigate('/')
      }
    }

    dispatch({ type: 'show_modal', payload: value });
    

  };

  return <div className='body'>
    {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal} />}
    <div className="regcontainer">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="uname" className="regheading">Username</label>
        <br />
        <input type="text" name="uname" placeholder="Enter Username" className="regunamepwdtab" value={uname} onChange={(e) => { setUname(e.target.value) }} required />
        <br />
        <label htmlFor="firstname" className="regheading">First name</label>
        <br />
        <input type="text" name="firstname" placeholder="Enter First Name" className="regunamepwdtab" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
        <br />
        <label htmlFor="lastname" className="regheading">Last Name</label>
        <br />
        <input type="text" name="lastname" placeholder="Enter Last Name" className="regunamepwdtab" value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
        <br />
        <label htmlFor="pwd" className="regheading">Password</label>
        <br />
        <input type="password" name="pwd" placeholder="Enter Password" className="regunamepwdtab" value={pwd} onChange={(e) => { setPwd(e.target.value) }} required />
        <br />
        <label htmlFor="repwd" className="regheading">Re Enter Password</label>
        <br />
        <input type="password" name="repwd" placeholder="Re Enter Password" className="regunamepwdtab" value={repwd} onChange={(e) => { setRepwd(e.target.value) }} required />
        <br />
        <button className="regsubmitBtn">Submit</button>
      </form>
    </div>
  </div>
}

export default Register;