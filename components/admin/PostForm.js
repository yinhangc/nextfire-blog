import { useForm } from 'react-hook-form';
import Card from '../ui/Card';
import ReactMarkdown from 'react-markdown';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ImageUpload from '../shared/ImageUpload';

export default function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });
    reset({ content, published });
    toast.success('帖子已更新');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <>
          <Card>
            <ReactMarkdown>{watch('content')}</ReactMarkdown>
          </Card>
        </>
      )}
      <div className={preview ? 'hidden' : 'grid gap-3'}>
        <ImageUpload />
        <textarea
          {...register('content', {
            maxLength: { value: 20000, message: '內容太長' },
            minLength: { value: 10, message: '內容太短' },
            required: '內容為必填',
          })}
          className="h-[60vh] w-full p-2 outline-none border-none rounded-lg"
        ></textarea>
        {errors.content && (
          <p className="text-red font-bold">{errors.content.message}</p>
        )}
        <fieldset className="flex items-center">
          <input
            id="published"
            type="checkbox"
            {...register('published')}
            className="inline mr-2 cursor-pointer h-4 w-4"
          />
          <label htmlFor="published" className="cursor-pointer font-bold">
            刊登
          </label>
        </fieldset>
        <button
          type="submit"
          className="bg-green text-white w-full"
          disabled={!isDirty || !isValid}
        >
          <span className="mr-3">💾</span>儲存變更
        </button>
      </div>
    </form>
  );
}
