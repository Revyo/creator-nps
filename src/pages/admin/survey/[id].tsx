import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';
import { Protected } from '~/components/Protected';

const SurveyViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const surveyResponseQuery = trpc.survey.getSurveyResponses.useQuery({ id });
  const calculateNPS = trpc.survey.calculateNPS.useMutation();

  const onClickHandler = async () => {
    await calculateNPS.mutateAsync({ id });
    await surveyResponseQuery.refetch();
  };

  if (surveyResponseQuery.error) {
    return (
      <NextError
        title={surveyResponseQuery.error.message}
        statusCode={surveyResponseQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (surveyResponseQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = surveyResponseQuery;

  return (
    <Protected isAdminRequired={true}>
      <div className="bg-slate-200 h-screen">
        <button onClick={onClickHandler}>Calculate NPS</button>
        {calculateNPS.isLoading ? (
          <p>Calculating NPS</p>
        ) : (
          <>
            <p>NPS: {data.npsScore}</p>
            <p>Promoter: {data.promoterPercent}</p>
            <p>Passive: {data.passivePercent}</p>
            <p>Detractor: {data.detractorPercent}</p>
          </>
        )}
      </div>
    </Protected>
  );
};

export default SurveyViewPage;
