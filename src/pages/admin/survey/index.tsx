import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';
import { Survey } from '@prisma/client';
import { Protected } from '~/components/Protected';

const SurveyIndexPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Survey>();
  const addSurvey = trpc.survey.add.useMutation();
  const onSubmit: SubmitHandler<Survey> = (data) => {
    const endDate = new Date(data.endDate);
    addSurvey.mutateAsync({ ...data, endDate });
  };

  return (
    <Protected isAdminRequired={true}>
      <div className="bg-slate-200 h-screen">
        <form
          className="flex flex-col w-1/2 my-0 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <label className="py-3" htmlFor="creator_id">
            Creator ID
          </label>
          <input className="rounded-lg" {...register('creator_id')} />
          {/* include validation with required or other standard HTML validation rules */}
          <label className="py-3" htmlFor="npsQuestion">
            NPS Question
          </label>
          <input
            className="rounded-lg"
            {...register('npsQuestion', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.npsQuestion && <span>This field is required</span>}
          <label className="py-3" htmlFor="contentQuestion">
            Content Question
          </label>
          <input
            className="rounded-lg"
            {...register('contentQuestion', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.contentQuestion && <span>This field is required</span>}
          <label className="py-3" htmlFor="feedbackQuestion">
            Feedback Question
          </label>
          <input
            className="rounded-lg"
            {...register('feedbackQuestion', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.feedbackQuestion && <span>This field is required</span>}

          <label className="py-3" htmlFor="endDate">
            End Date
          </label>
          <input
            className="rounded-lg"
            type="date"
            {...register('endDate', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.feedbackQuestion && <span>This field is required</span>}
          <label className="py-3" htmlFor="distributedPlatform">
            Platform
          </label>
          <input
            className="rounded-lg"
            {...register('distributedPlatform', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.distributedPlatform && <span>This field is required</span>}

          <input
            className="bg-blue-400 rounded-md w-80 mx-auto mt-10 cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </Protected>
  );
};

export default SurveyIndexPage;
