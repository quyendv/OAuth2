import { useContext } from 'react';
import { Link } from 'react-router-dom';
import routesConfigs from '~/configs/routes.config';
import { AuthContext } from '~/providers/AuthProvider';

function Header() {
  const [{ user }, dispatch] = useContext(AuthContext);

  const handleSignout = () => {
    window.open(
      `${import.meta.env.DEV ? import.meta.env.VITE_SERVER_DEV : import.meta.env.VITE_SERVER_PROD}/auth/signout`,
      '_self',
    );
  };

  return (
    <header className="flex h-16 w-full items-center bg-purple-500 px-12">
      {/* Logo */}
      <span className="text-xl font-bold text-white">Q App</span>

      {/* TODO: Nav */}

      {/* User */}
      <div className="ml-auto flex items-center space-x-3 font-semibold text-white">
        {user ? (
          <>
            {/* Avatar */}
            <div>
              <img src={user.photos[0].value} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            </div>

            {/* Name */}
            <div>{user.displayName}</div>

            {/* SignOut */}
            <button onClick={handleSignout}>SignOut</button>
          </>
        ) : (
          <Link to={routesConfigs.signin}>Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
