import React, { useState } from 'react';
import Modal from 'react-modal';

import { register } from '../actions/userActions';
import { useDispatch } from 'react-redux';

Modal.setAppElement('#app');

const RegisterModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalIsOpen(false)
    dispatch(register(name, email, password))
    // console.log('handle submit hit!!!');
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className='modal'
        overlayClassName='modalOverlay'
      >
        <h2 className='modalTitle'>Register</h2>
        <form className='modalForm' onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='modalFormInput'
            required
          />
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
              Register
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

export default RegisterModal;
