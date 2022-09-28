import NextError from 'next/error';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';
import { RadioInput } from '../../components/RadioInput';
import { ErrorSpan } from '../../components/ErrorSpan';
import { SurveyInstructions } from '../../components/SurveyInstructions';
import { Protected } from '~/components/Protected';

interface InputValues {
  npsResponse: number;
  contentResponse: number;
  feedbackResponse: string;
  survey_id: string;
}

const SurveyViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const surveyQuery = trpc.survey.byId.useQuery({ id });
  const responseMutation = trpc.response.add.useMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputValues>();
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    const npsResponse = Number(data.npsResponse);
    const contentResponse = Number(data.contentResponse);
    responseMutation.mutateAsync({
      ...data,
      survey_id: id,
      npsResponse,
      contentResponse,
    });
  };

  if (surveyQuery.error) {
    return (
      <NextError
        title={surveyQuery.error.message}
        statusCode={surveyQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (surveyQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = surveyQuery;
  return (
    <Protected isAdminRequired={false}>
      <div className="bg-slate-200 h-screen">
        <SurveyInstructions />
        <form
          className="flex flex-col w-1/2 my-0 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="py-3" htmlFor="npsResponse">
            {data.npsQuestion}{' '}
          </label>
          <RadioInput control={control} {...register('npsResponse')} />
          {errors.npsResponse && <ErrorSpan />}
          <label className="py-3" htmlFor="contentResponse">
            {data.contentQuestion}{' '}
          </label>
          <RadioInput control={control} {...register('contentResponse')} />
          {errors.contentResponse && <ErrorSpan />}
          <label className="py-3" htmlFor="feedbackResponse">
            {data.feedbackQuestion}{' '}
          </label>
          <textarea
            className="border-solid border-black border-2"
            rows={10}
            placeholder="Feedback question"
            {...register('feedbackResponse', { required: true })}
          />
          {errors.feedbackResponse && <ErrorSpan />}

          <input className="bg-blue-400 rounded-md w-80 mt-7" type="submit" />
        </form>
      </div>
    </Protected>
  );
};

export default SurveyViewPage;
