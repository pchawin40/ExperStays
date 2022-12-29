// frontend/src/UpperNavigation/UpperNavigation.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import css
import './UpperNavigation.css';

// import session store
import * as sessionActions from '../../../../store/session';
import * as userActions from '../../../../store/users';

// import component
import ProfileButton from './ProfileButton/ProfileButton';
import LoginFormModal from '../../UserLoginRegistration/LoginFormModal';
import LogoContainer from './LogoContainer';
import SearchBar from './SearchBar';
import DemoUser from '../../UserLoginRegistration/DemoUser';
import { useEffect } from 'react';
import UpperRightNavLink from './UpperRightNavLink';

//? UpperNavigation Component
const UpperNavigation = ({ isLoaded }) => {

  // get current session user
  // const sessionUser = undefined;
  const sessionUser = useSelector(sessionActions.getSessionUser);

  // invoke dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionUser) {
      dispatch(userActions.thunkLoadUserById(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  // get user's name
  const user = useSelector(userActions.getAllUsers);

  const sessionLinks =
    // When have session user, contain link to log out current user
    sessionUser ?
      // render ProfileButton component 
      <ProfileButton />
      :
      // When no session user, contain links to login and sign up
      <>
        {/* //? Demo User */}
        <DemoUser />
        {/* //? Login link */}
        <LoginFormModal to='/login'>Log In</LoginFormModal>
        {/* //? Signup link */}
        <NavLink id="sign-up-button" to='/signup'>Sign Up</NavLink>
      </>;


  const userHostLinks =
    sessionUser ?
      // Switch to hosting (if logged in)
      <>
        {user.firstName} {user.lastName}
        <NavLink className="user-host-links" to="/host/homes">Host a Spot</NavLink>
      </>
      :
      // Become a host (if not logged in)
      <NavLink className="user-host-links" to="/signup">Become a Host</NavLink>;

  //? Render UpperNavigation Links and Logout button
  return (
    <div id="navigation-bar" style={{ zIndex: 10 }}>
      {/* //? Render Logo Container */}
      <LogoContainer />

      {/* //? Render Search Link */}
      <SearchBar userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />

      {/* // TODO: Render User Link */}
      {/* //? UpperRightNavLink */}
      <UpperRightNavLink userHostLinks={userHostLinks} isLoaded={isLoaded} user={user} sessionLinks={sessionLinks} />
    </div>
  );
};

// export UpperNavigation
export default UpperNavigation;
