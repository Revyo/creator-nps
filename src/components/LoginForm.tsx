import { useForm, SubmitHandler } from 'react-hook-form';
import { Magic } from 'magic-sdk';
import { ErrorSpan } from './ErrorSpan';

interface InputType {
  email: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => {
    const magic = new Magic('pk_live_290C03F84D93CD3F');
    try {
      magic.auth.loginWithMagicLink({ email: data.email, showUI: true });
    } catch (error) {
      console.log('Authentication failed');
    }
  };

  return (
    <form
      className="flex flex-col w-1/2 my-0 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center">
        <label className="mx-3 font-bold" htmlFor="email">
          Email:
        </label>
        <input
          className="border-solid border-black border-2"
          {...register('email', { required: true })}
        />
      </div>
      {errors.email && <ErrorSpan />}
      <input
        className="w- bg-blue-500 mx-auto my-5 rounded-2xl h-8 text-slate-50"
        type="submit"
      />
    </form>
  );
};
