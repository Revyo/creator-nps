import NextError from 'next/error';
import Link from 'next/link';
import { Protected } from '~/components/Protected';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const CreatorViewPage: NextPageWithLayout = () => {
  const creatorQuery = trpc.creator.GetAll.useQuery();

  if (creatorQuery.error) {
    return (
      <NextError
        title={creatorQuery.error.message}
        statusCode={creatorQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (creatorQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = creatorQuery;
  return (
    <Protected isAdminRequired={true}>
      <>
        <h1>All Creators</h1>

        {data.map((creator) => {
          return (
            <div key={creator.id}>
              <Link href={`/admin/creator/${creator.id}`}>
                <p>{creator.name}</p>
              </Link>
              <p>{creator.email}</p>
            </div>
          );
        })}
      </>
    </Protected>
  );
};

export default CreatorViewPage;
