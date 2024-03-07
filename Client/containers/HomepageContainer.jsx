import React from 'react';
import FavoritesStretch from '../components/HomepageFavorites.jsx';
import { useSelector } from 'react-redux';

const HomepageContainer = () => {

  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.userLogin);

  // init stretchComponents as empty arr, this will store Stretch components before rendering
  const favComponents = [];
  // if favs is not undefined/null, iterate through favs and push a new TaskRow component with id and key properties
  if (Array.isArray(favorites)) {
    favorites.forEach((stretch) => {
      favComponents.push(
        <FavoritesStretch
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
      <h4>Welcome {user.userInfo.userDetail.name}!</h4>
      <h4>Your Favorite Stretches:</h4>
      <div className='stretchBox'>{favComponents}</div>
    </div>
  );
};

export default HomepageContainer;
