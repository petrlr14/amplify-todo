import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
} from '@aws-amplify/ui-react';
import Auth from './Auth';

Amplify.configure(awsExports);

ReactDOM.render(
  <AmplifyAuthContainer>
    <AmplifyAuthenticator>
      <React.StrictMode>
        <Auth>
          <App />
        </Auth>
      </React.StrictMode>
    </AmplifyAuthenticator>
  </AmplifyAuthContainer>,
  document.getElementById('root')
);
