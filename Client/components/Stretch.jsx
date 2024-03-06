import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite } from '../actions/userActions';

const Stretch = ({ name, equipment, difficulty, instructions }) => {
  const user = useSelector((state) => state.userLogin);
  const favs = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);

  const addToFavorites = () => {
    setAdded(true);
    console.log(user.userInfo.userDetail.email);
    dispatch(
      addFavorite(
        user.userInfo.userDetail.email,
        name,
        equipment,
        difficulty,
        instructions
      )
    );
  };

  // insert any logic for the Stretch here
  // return stretch component with passed-in props from query to server

  return (
    <div className='stretchComp'>
      <h3>{name}</h3>
      <ul>
        <li>
          <strong>Equipment:</strong> {equipment}
        </li>
        <li>
          <strong>Difficulty:</strong> {difficulty}
        </li>
        <li>
          <strong>Instructions:</strong> {instructions}
        </li>
      </ul>

      {!added ? (
        <button className={'faveButton'} onClick={addToFavorites}>
          Add to Favorites
        </button>
      ) : (
        <h2>Already In Favorites</h2>
      )}
    </div>
  );
};
export default Stretch;
