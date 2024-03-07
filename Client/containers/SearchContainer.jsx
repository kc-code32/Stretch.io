import React, { useEffect, useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../actions/userActions';
import axios from 'axios';

const SearchContainer = () => {
  const [stretches, setStretches] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('Select Muscle');

  const user = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const fetchStretches = async (muscle) => {
    try {
      const response = await axios.post('/api', { muscle });
      setStretches(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const lastUsedMuscle = localStorage.getItem('muscleGroup');
    if (lastUsedMuscle) {
      setSelectedMuscle(lastUsedMuscle);
      fetchStretches(lastUsedMuscle);
    }
  }, []);

  const handleMuscleChange = (event) => {
    setSelectedMuscle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStretches(selectedMuscle);
    localStorage.setItem('muscleGroup', selectedMuscle);
  };

  const addToFavorites = (name, equipment, difficulty, instructions) => {
    if (user.userInfo) {
      dispatch(addFavorite(user.userInfo.userDetail.email, name, equipment, difficulty, instructions));
    }
  };

  const stretchComponents = stretches.map((stretch) => (
    <Stretch
      key={stretch.name}
      name={stretch.name}
      equipment={stretch.equipment}
      difficulty={stretch.difficulty}
      instructions={stretch.instructions}
      addToFavorites={addToFavorites}
    />
  ));

  const muscleOptions = {
    _select: 'Select Muscle',
    abductors: 'Abductors',
    biceps: 'Biceps',
    calves: 'Calves',
    chest: 'Chest',
    forearms: 'Forearms',
    glutes: 'Glutes',
    hamstrings: 'Hamstrings',
    lats: 'Lats',
    lower_back: 'Lower back',
    middle_back: 'Middle back',
    neck: 'Neck',
    quadriceps: 'Quadriceps',
    traps: 'Traps',
    triceps: 'Triceps',
  };

  const renderMuscleOptions = () => {
    return Object.entries(muscleOptions).map(([key, value]) => (
      // <option key={key} value={key}>
      <option key={key} >
        {value}
      </option>
    ));
  };

  return (
    <div className="searchContainer">
      <form className="dropdownMenu" onSubmit={handleSubmit}>
        <select
          id="searchQ"
          value={selectedMuscle}
          onChange={handleMuscleChange}
          className="selectInput"
        >
          {renderMuscleOptions()}
        </select>
        <button id="dropMenu" type="submit" className="submitButton">
          Search
        </button>
      </form>
      <div className="stretchBox">{stretchComponents}</div>
    </div>
  );
};

export default SearchContainer;