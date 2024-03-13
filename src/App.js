import './App.css';

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

function App() {
  const poolData = {
    UserPoolId: '',
    ClientId: '',
  };

  const username = '';
  const password = ''; // Changed Password to password (camelCase)

  const userPool = new CognitoUserPool(poolData);
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  const authData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authData);

  const authenticateUser = () => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (data) => {
        const totpMfaSettings = {
          PreferredMfa: true,
          Enabled: true,
        };
        cognitoUser.setUserMfaPreference(null, totpMfaSettings, function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
          }
          console.log('call result ' + result);
        });
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={authenticateUser}>Enable MFA</button>
      </header>
    </div>
  );
}

export default App;
