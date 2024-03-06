import React, { useEffect, useState } from 'react';
import Stretch from '../components/Stretch.jsx';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const SearchContainer = () => {
  const [stretches, setStretches] = useState();
  const [input, setInput] = useState('biceps');

  const stretchFetch = async (muscle) => {
    const data = {
      muscle,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await axios.post('/api', data, config);
      console.log(result);
      setStretches(result.data);
      redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  // componentDidMount
  useEffect(() => {
    const lastUsedMuscle = localStorage.getItem("muscleGroup");
    setInput(lastUsedMuscle)
    stretchFetch(lastUsedMuscle); // as soon as page loads, it calls stretchFetch and makes biceps parameter
  }, []);

  //event handler for submit
  const handleSubmit = (event) => {
    event.preventDefault();
    stretchFetch(input);
    localStorage.setItem("muscleGroup", input); // sets input into storage so if user leaves searchpage and goes back, it'll still be on same input
  };

  //event handler for change
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setInput(event.target.value);
  };

  // init stretchComponents as empty arr, this will store Stretch components before rendering
  const stretchComponents = [];
  // if stretchesFromAPI is not undefined/null, iterate through stretchesFromAPI and push a new TaskRow component with id and key properties
  if (Array.isArray(stretches)) {
    stretches.forEach((stretch) => {
      stretchComponents.push(
        <Stretch
          name={stretch.name}
          equipment={stretch.equipment}
          difficulty={stretch.difficulty}
          instructions={stretch.instructions}
        ></Stretch>
      );
    });
  }

  const createOptions = () => {
    let optionsObj = {
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

    const allOptions = [];
    for (let keys in optionsObj) {
      allOptions.push(<option value={keys}>{optionsObj[keys]}</option>);
    }
    return allOptions;
  };

  return (
    <div className='searchContainer'>
      <form
        className='dropdownMenu'
        onSubmit={handleSubmit}
        placeholder='Select muscle'
      >
        <select
          id='searchQ'
          // type='text'
          value={input}
          onChange={handleChange}
          className='selectInput'
        >
          {createOptions()}
        </select>
        <input id='dropMenu' type='submit' className='submitButton' />
      </form>
      <div className='stretchBox'>{stretchComponents}</div>
    </div>
  );
};
export default SearchContainer;

{
  /* <option value=''>Select muscle</option>
<option value='abductors'>Adductors</option>
<option value='biceps'>Biceps</option>
<option value='calves'>Calves</option>
<option value='chest'>Chest</option>
<option value='forearms'>Forearms</option>
<option value='glutes'>Glutes</option>
<option value='hamstrings'>Hamstrings</option>
<option value='lats'>Lats</option>
<option value='lower_back'>Lower Back</option>
<option value='middle_back'>Middle Back</option>
<option value='neck'>Neck</option>
<option value='quadriceps'>Quadriceps</option>
<option value='traps'>Traps</option>
<option value='triceps'>Triceps</option> */
}
