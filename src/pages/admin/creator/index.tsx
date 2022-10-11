import { useForm, SubmitHandler } from 'react-hook-form';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';
import { Protected } from '~/components/Protected';

interface InputValues {
  name: string;
  email: string;
}

const CreatorIndexPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValues>();
  const addCreator = trpc.creator.add.useMutation();
  const onSubmit: SubmitHandler<InputValues> = (data) => {
    addCreator.mutateAsync(data);
  };

  return (
    <Protected isAdminRequired={true}>
      <div className="bg-slate-200 h-screen">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="Creator Name"
            {...register('name', { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          {/* include validation with required or other standard HTML validation rules */}
          <input
            placeholder="Creator Email"
            {...register('email', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </Protected>
  );
};

export default CreatorIndexPage;
