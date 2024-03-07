import React, { useEffect, useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Import the images
import pic1 from '../images/pic1.svg';
import pic2 from '../images/pic2.svg';
import pic3 from '../images/pic3.svg';

const MainContainer = () => {
  const user = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('testing');
    console.log(user);
    if (user.loggedIn === true) {
      navigate('/homepage');
    }
  }, [user]);

  return (
    <div className="main-container">
      <section className="section">
        <div className="image">
          <img src={pic1} alt="Image 1" />
        </div>
        <div className="content">
          <h2>DON'T FORGET!</h2>
          <p>Even if you don't have time for a big workout, stretching in the morning and night really changes your body.</p>
        </div>
      </section>

      <section className="section reverse">
        <div className="image">
          <img src={pic2} alt="Image 2" />
        </div>
        <div className="content">
          <h2>FUN FACT!</h2>
          <p>True success is achieved by stretching oneself, learning to feel comfortable being uncomfortable..</p>
        </div>
      </section>

      <section className="section">
        <div className="image">
          <img src={pic3} alt="Image 3" />
        </div>
        <div className="content">
          <h2>IF I CAN, YOU CAN!</h2>
          <p>I am always doing that which I cannot do, in order that I may learn how to do it..</p>
        </div>
      </section>
    </div>
  );
};

export default MainContainer;

