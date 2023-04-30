import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Home.css';

const Home = () =>{
    return (
        <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            {user && user.signInUserSession && user.signInUserSession.accessToken && (
              <div>
                {user.signInUserSession.accessToken.payload['cognito:groups'] &&
                  user.signInUserSession.accessToken.payload['cognito:groups'].includes('Admins') && (
                    <p>You are an Admin user</p>
                )}
                {user.signInUserSession.accessToken.payload['cognito:groups'] &&
                  user.signInUserSession.accessToken.payload['cognito:groups'].includes('Writers') && (
                    <p>You are a Writer user</p>
                )}
                {user.signInUserSession.accessToken.payload['cognito:groups'] &&
                  user.signInUserSession.accessToken.payload['cognito:groups'].includes('Readers') && (
                    <p>You are a Reader user</p>
                )}
              </div>
            )}
            <button onClick={signOut} className='amazon-button'>Sign out</button>
          </main>
        )}
      </Authenticator>
    )
}

export default Home