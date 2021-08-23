import { useState, useEffect } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { FC } from 'react';

const Auth: FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setAuthUser] = useState<object | undefined>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setAuthUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <>
      {children}
      <div className="w-full fixed bottom-0">
        <AmplifySignOut />
      </div>
    </>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default Auth;
