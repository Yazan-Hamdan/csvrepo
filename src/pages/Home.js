import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Navbar from './Navbar.js';
import './Home.css';

const Home = () => {
  const [userGroup, setUserGroup] = useState(null);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (user && user.signInUserSession) {
          const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
          setUserGroup(groups);
        }

        return (
          <>
            <Navbar userGroup={userGroup} SignOutHandler={signOut}/>
            <main>
              <h1>Hello {user && user.username}</h1>
            </main>
          </>
        );
      }}
    </Authenticator>
  );
};

export default Home;