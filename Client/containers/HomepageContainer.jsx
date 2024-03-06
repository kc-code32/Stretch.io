import { formToJSON } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesStretch from '../components/HomepageFavorites.jsx';
import { useSelector } from 'react-redux';

const HomepageContainer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  const favorites = useSelector((state) => state.favorites.favorites);
  // confrim with Sean about userInfo state is called correctly
  const user = useSelector((state) => state.userLogin);

  // create handleDelete for delete button

  // init stretchComponents as empty arr, this will store Stretch components before rendering
  const favComponents = [];
  // if favs is not undefined/null, iterate through favs and push a new TaskRow component with id and key properties
  //unsure how to access favorites stored in state
  if (Array.isArray(favorites)) {
    favorites.forEach((stretch) => {
      favComponents.push(
        <FavoritesStretch
          // confrim with Sean about email state is called correctly
          email={user.userInfo.userDetail.email}
          name={stretch.name}
          equipment={stretch.equipment}
          difficulty={stretch.difficulty}
          instructions={stretch.instructions}
        />
      );
    });
  }

  return (
    <div style={{ textAlign: 'center'}}>
      {/* <div>Search for streches or see your favorites below.</div>
      <button onClick={handleClick}>Search Page</button> */}
      <h4>Welcome {user.userInfo.userDetail.name}!</h4>
      <h4>Your Favorite Stretches:</h4>
      <div className='stretchBox'>{favComponents}</div>
    </div>
  );
};

export default HomepageContainer;
