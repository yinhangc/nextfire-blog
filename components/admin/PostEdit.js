import { firestore, auth } from '../../lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import PostForm from './PostForm';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../ui/Loader';

export default function PostEdit(props) {
  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .doc(slug);
  const [data, loading, error] = useDocumentDataOnce(postRef);

  useEffect(() => {
    setPost(data);
  }, [data]);

  const deletePost = async () => {
    try {
      await postRef.delete();
      router.push('/admin');
      toast.success('刪除成功');
    } catch (err) {
      toast.error('刪除失敗');
    }
  };

  return (
    <main>
      <Loader show={loading} />
      {!loading && post && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr,max-content] gap-4">
          <section>
            <h1>{post.title}</h1>
            <p className="mb-4">
              <span className="underline mr-2">ID:</span>
              {post.slug}
            </p>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
          <aside className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center gap-4 h-[max-content]">
            <button onClick={() => setPreview(!preview)} className="w-full">
              {preview ? '編輯' : '預覧'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="bg-blue text-white w-full">前往帖子</button>
            </Link>
            {!preview && (
              <button onClick={deletePost} className="w-full bg-red text-white">
                刪除帖子
              </button>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
