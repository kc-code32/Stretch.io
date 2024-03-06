import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const LoginModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalIsOpen(false);
    console.log('email: ', email)
    console.log('password: ', password)
    dispatch(login(email, password))
    console.log('handle submit hit!!!');
    
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Log In</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className='modal'
        overlayClassName='modalOverlay'
      >
        <h2 className='modalTitle'>Log In</h2>
        <form className='modalForm' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='modalFormInput'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='modalFormInput'
            required
          />
          <div className='modalButtons'>
            <button type='submit' className='modalButton'>
              Log In
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className='modalButton'
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
