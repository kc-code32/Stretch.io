import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import RegisterModal from '../components/RegisterModal.jsx';
import LoginModal from '../components/LoginModal.jsx';
import { logout } from '../actions/userActions';
import iconImage from '../images/exercising.svg'

const HeaderContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin);
  const currentPath = location.pathname;

  const handleLogout = () => {
    console.log('logout hit!!!');
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleHomePage = () => {
    navigate('/homepage');
  };

  return (
    <div id='navBar'>

      <div id='flex-item' className='flex-item'>
        <img src={iconImage} alt="Icon" className="icon" />
        <h1 className='navHeader'>Stretch.io</h1>
      </div>

      <div id='flex-item' className='authButtons'>
        {userInfo?.userInfo && (
          <>
            {currentPath === '/search' && (
              <div className='authButton active'>
                <button className='submitButton' onClick={handleHomePage}>
                  HomePage
                </button>
              </div>
            )}

            {currentPath === '/homepage' && (
              <div className='authButton active'>
                <button className='submitButton' onClick={handleSearch}>
                  Search Stretches
                </button>
              </div>
            )}

            <div className='authButton'>
              <button className='submitButton' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}

        {!userInfo?.userInfo && (
          <>
            <div className='authButton'>
              <RegisterModal />
            </div>
            <div className='authButton'>
              <LoginModal />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderContainer;






