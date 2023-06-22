import { useContext, useEffect } from 'react';
import { AuthContext, setUser } from '~/providers/AuthProvider';
import Header from '../common/Header';

function MainLayout({ children }) {
  const [state, dispatch] = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.DEV ? import.meta.env.VITE_SERVER_DEV : import.meta.env.VITE_SERVER_PROD
          }/auth/signin/success`,
          {
            method: 'GET',
            credentials: 'include', // The request sends the credential that accompanies the request. Credentials are stored in cookies or other methods to determine if the user is logged in or not.
            headers: {
              Accept: 'application/json', // Specifies that the request expects to receive JSON results from the server.
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true, // Specifies that the server must allow the use of authentication information from a different domain source.
            },
          },
        ).then((res) => res.json());

        console.log(response);
        if (response.success) {
          dispatch(setUser(response.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <>
      {/* TODO: Global Loading */}

      {/* Layout */}
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* MainPage - MainContent */}
        <main className="flex-1 overflow-hidden">{children}</main>

        {/* TODO: Footer */}
      </div>
    </>
  );
}

export default MainLayout;
