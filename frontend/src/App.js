// frontend/src/App.js

// import react-router-dom
import { Switch, Route } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import components
import LoginFormModal from './components/UserLoginRegistration/LoginFormModal'
import SignupFormPage from './components/UserLoginRegistration/SignupFormPage';
import Navigation from './components/Navigation';

// import session store 
import * as sessionActions from './store/session';
import HomeFooterBar from './components/Navigation/HomeFooterBar';
import MapContainer from './components/Maps';

function App() {

  // invoke dispatch
  const dispatch = useDispatch();
  
  // state: isLoaded 
  const [isLoaded, setIsLoaded] = useState(false);

  // on load...
  useEffect(() => {
    // ... restore session user and set is loaded to true
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [isLoaded, dispatch]);

  return (
      isLoaded && (
      <>
        <Route exact path="/test">
          {/* HomeFooterBar */}
          <HomeFooterBar/>
        </Route>
        {/* //? Navigation */}
        <Navigation isLoaded={isLoaded} />
        <MapContainer />
        <Switch>
          {/* //? route: / */}
          <Route path="/signup">
            {/* SignupFormPage component */}
            <SignupFormPage />
          </Route>
        </Switch>
      </>
      )
  );
}

export default App;
