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
          <h2>BLAH BLAH BLAH</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum efficitur elit.</p>
        </div>
      </section>

      <section className="section reverse">
        <div className="image">
          <img src={pic2} alt="Image 2" />
        </div>
        <div className="content">
          <h2>BLOOPITY BLOOP!!!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum efficitur elit.</p>
        </div>
      </section>

      <section className="section">
        <div className="image">
          <img src={pic3} alt="Image 3" />
        </div>
        <div className="content">
          <h2>DIPPITY DO....</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum efficitur elit.</p>
        </div>
      </section>
    </div>
  );
};

export default MainContainer;

