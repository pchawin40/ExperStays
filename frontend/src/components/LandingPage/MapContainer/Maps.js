// frontend/src/components/Maps/Maps.js

// import react
import React from 'react';

// import api
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// import css
import './Maps.css';

// import react-redux
import { useDispatch } from 'react-redux';

// import store
import * as reviewActions from '../../../store/reviews';

// style for map container
const containerStyle = {
  width: '80vw',
  height: '80vh'
}

// where to pinpoint map at center location
const center = {
  lat: 37.799102,
  lng: -122.401256
}

//? Maps Component
const Maps = ({ apiKey, setShowMapModal}) => {

  //? isLoaded: whether API is successfully loaded
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  // invoke dispatch
  const dispatch = useDispatch();

  return (
    <div>
      {
        isLoaded && (
          // load google map if api is loaded
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={20}
            />

            {/* // button to show list */}
            <button
              id="map-button"
              onClick={_ => {
                dispatch(reviewActions.thunkGetReviews())
                .then(() => setShowMapModal(false));
              }}
            >
              Show list
              <i className="fa-solid fa-list map-list-icon"></i>
            </button>
          </>
        )
      }
    </div>
  );
};

// export Maps component
export default React.memo(Maps);
