import { ReactNode, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { magicContext } from '~/contexts';

type DefaultLayoutProps = { children: ReactNode; isAdminRequired: boolean };

export const Protected = ({
  children,
  isAdminRequired,
}: DefaultLayoutProps) => {
  const router = useRouter();
  const { user } = useContext<any>(magicContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    async function checkUserLoggedIn() {
      try {
        const loggedIn = await user.isLoggedIn();
        console.log('LOGGED IN PROTECTED', loggedIn);
        if (!loggedIn && router.pathname !== '/login') {
          router.replace('/');
          setLoading(false);
        } else if (isAdminRequired) {
          const userData = await user.getMetadata();
          const isAdmin = userData.email === 'jess@revyo.co';
          if (!isAdmin) {
            router.back();
          }
        }
        setLoading(false);
      } catch (error) {
        console.log('User auth error');
      }
    }
    checkUserLoggedIn();
  }, [router.pathname, user]);
  return <>{loading ? <p>loading</p> : children}</>;
};
