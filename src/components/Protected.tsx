import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';

type DefaultLayoutProps = { children: ReactNode; isAdminRequired: boolean };

export const Protected = ({
  children,
  isAdminRequired,
}: DefaultLayoutProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const magic = new Magic('pk_live_290C03F84D93CD3F');
    async function checkUserLoggedIn() {
      try {
        const loggedIn = await magic.user.isLoggedIn();
        if (!loggedIn && router.pathname !== '/login') {
          router.replace('/');
          setLoading(false);
        } else if (isAdminRequired) {
          const userData = await magic.user.getMetadata();
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
  }, [router.pathname]);
  return <>{loading ? <p>loading</p> : children}</>;
};
