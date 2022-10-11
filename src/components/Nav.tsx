import { useContext, useEffect, useState } from 'react';
import { magicContext } from '~/contexts';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const { user } = useContext<any>(magicContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = async () => {
    await user.logout();
    router.push('/');
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      if (user) {
        setLoggedIn(await user.isLoggedIn());
      }
    };
    isLoggedIn();
  }, [user]);

  return (
    <header>
      <nav>
        {loggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href={'/login'}>Login</Link>
        )}
      </nav>
    </header>
  );
};
