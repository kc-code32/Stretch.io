import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavorite } from '../actions/userActions';

const FavoritesStretch = ({
  email,
  name,
  equipment,
  difficulty,
  instructions,
}) => {
  const user = useSelector((state) => state.userLogin);
  const favs = useSelector((state) => state.favorites);

  const [removed, setRemoved] = useState(false);

  const dispatch = useDispatch()

  const removeFromFavorites = async () => {
    setRemoved(true);
    
    dispatch(deleteFavorite(email, name))

  }
    
  //add functionality below to - refresh render
  //add undo functionality? - Removed from Favorites, Re-Add to Favorites? --> removed on refresh?
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

      {!removed ? (
        <button onClick={removeFromFavorites}>Remove From Favorites</button>
      ) : (
        <h2>Removed from Favorites</h2>
      )}
    </div>
  );
};

export default FavoritesStretch;
