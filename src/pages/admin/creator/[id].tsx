import NextError from 'next/error';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Protected } from '~/components/Protected';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const CreatorViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const creatorQuery = trpc.creator.GetSurveys.useQuery({ id });

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
        <h1>Creator Surveys</h1>

        {/* TODO: Table of surveys, click one to go to that page. Survey page will be the report */}
        {data.survey.map((survey) => {
          return (
            <div key={survey.id}>
              <Link href={`/admin/survey/${survey.id}`}>
                <p>{survey.npsQuestion}</p>
              </Link>
            </div>
          );
        })}
      </>
    </Protected>
  );
};

export default CreatorViewPage;
