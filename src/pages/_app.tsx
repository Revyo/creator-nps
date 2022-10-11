import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { AppType } from 'next/dist/shared/lib/utils';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Magic } from 'magic-sdk';
import { magicContext } from '~/contexts';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';
import '../styles/global.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const [magic, setMagic] = useState<Magic>();
  useEffect(() => {
    const magic = new Magic('pk_live_290C03F84D93CD3F');
    setMagic(magic);
  }, []);
  const getLayout =
    Component.getLayout ??
    ((page) => {
      console.log(`MAGIC: ${magic}`);
      return (
        <magicContext.Provider value={{ user: magic?.user, auth: magic?.auth }}>
          <DefaultLayout>{page}</DefaultLayout>
        </magicContext.Provider>
      );
    });

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(MyApp);
