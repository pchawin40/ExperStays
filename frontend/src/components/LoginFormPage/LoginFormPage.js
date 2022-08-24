// frontend/src/components/LoginFormPage/LoginFormPage.js

// import react
import { useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { Redirect } from 'react-router-dom';

// import session store
import * as sessionActions from '../../store/session';


// TODO: LoginFormPage component
//? holds all the files for login form
const LoginFormPage = () => {

  // dispatch
  const dispatch = useDispatch();

  // getSessionUser: get current session user
  const currentUser = useSelector(sessionActions.getSessionUser);

  //? controlled input: 
  /**
   * credential: Username or Email
   * password: User Password
   * validationErrors: Errors from inputs
   */
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  //? Handle Submit
  // if there is current session user, redirect user to '/'
  if (currentUser) return <Redirect to='/' />;

  // function to handle form on submit
  const handleSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // user to login
    const user = {
      credential,
      password
    };
    
    // reset validation errors before dispatching
    setValidationErrors([]);

    // dispatch login thunk action
    // handle and display errors if any
    return dispatch(sessionActions.login(user)).catch(
      async res => {
        const data = await res.json();
        console.log("data", data);
        //! Cannot get data.errors, returning undefined
        //! 1. Tried just data and saying validationErrors.map is not a function
        
        if (data) setValidationErrors([data]);
      }
    )
  }

  // return login form
  return (
    <form onSubmit={handleSubmit}>
      {/* //? Display Errors (if any) */}
      <ul>
        {
          validationErrors.map(error => {
            console.log("error", error);
            return <li key={error}>{error.message}</li>
          }
          )
        }
      </ul>

      {/* //? Username */}
      <input
        placeholder="Username or Email"
        type='credential'
        value={credential}
        onChange={e => setCredential(e.target.value)}
        required
      />

      {/* //? Password */}
      <input
        placeholder="Password"
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      {/* //? Log In Button */}
      <button
        type="submit"
        onClick={e => handleSubmit(e)}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginFormPage;