import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Home.css';

const Home = () =>{
    return (
        <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut} className='amazon-button'>Sign out</button>
          </main>
        )}
      </Authenticator>
    )
}

export default Home