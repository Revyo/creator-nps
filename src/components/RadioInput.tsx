import { useController, UseControllerProps } from 'react-hook-form';

interface InputValues {
  npsResponse: number;
  contentResponse: number;
  feedbackResponse: string;
  survey_id: string;
}

export const RadioInput = ({
  control,
  name,
}: UseControllerProps<InputValues>) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={1} id={`${name}-1`} />
        <span>1</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={2} id={`${name}-2`} />
        <span>2</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={3} id={`${name}-3`} />
        <span>3</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={4} id={`${name}-4`} />
        <span>4</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={5} id={`${name}-5`} />
        <span>5</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={6} id={`${name}-6`} />
        <span>6</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={7} id={`${name}-7`} />
        <span>7</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={8} id={`${name}-8`} />
        <span>8</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={9} id={`${name}-9`} />
        <span>9</span>
      </div>
      <div className="flex flex-col items-center">
        <input {...field} type={'radio'} value={10} id={`${name}-10`} />
        <span>10</span>
      </div>
    </div>
  );
};
