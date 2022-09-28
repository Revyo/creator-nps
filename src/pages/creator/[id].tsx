import NextError from 'next/error';
import { useRouter } from 'next/router';
import { Protected } from '~/components/Protected';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const CreatorViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const creatorQuery = trpc.creator.byId.useQuery({ id });

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
    <Protected isAdminRequired={false}>
      <>
        <h1>{data.name}</h1>
        <em>Created {data.createdAt.toLocaleDateString('en-us')}</em>

        <p>{data.email}</p>

        {/* TODO: Table of surveys, click one to go to that page. Survey page will be the report */}

        <h2>Raw data:</h2>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </>
    </Protected>
  );
};

export default CreatorViewPage;
