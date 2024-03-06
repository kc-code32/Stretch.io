import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import HeaderContainer from './containers/HeaderContainer.jsx';
import HomepageContainer from './containers/HomepageContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';

// Init func app that returns our main containers
const App = () => {
  return (

    
    <Router>
      <HeaderContainer />
      <Routes>
      <Route path='/' element={<MainContainer />}></Route>
      <Route path='/homepage' element={<HomepageContainer />}></Route>
      <Route path='/search' element={<SearchContainer />}></Route>
      </Routes>
    </Router>
  );
};

export default App