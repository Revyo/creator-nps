import { useEffect, useState, ReactNode } from 'react';
// import { Magic } from 'magic-sdk';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from './Nav';
type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const magic = new Magic('pk_live_290C03F84D93CD3F');
  //   async function checkUserLoggedIn() {
  //     try {
  //       const loggedIn = await magic.user.isLoggedIn();
  //       if (!loggedIn && router.pathname !== '/login') {
  //         router.replace('/');
  //         setLoading(false);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.log('User auth error');
  //     }
  //   }
  //   checkUserLoggedIn();
  // }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen">{children}</main>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
