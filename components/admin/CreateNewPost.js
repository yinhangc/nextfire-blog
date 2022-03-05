import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { firestore, auth } from '../../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';

export default function CreateNewPost(props) {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
    };
    await ref.set(data);
    toast.success('已創建帖子');
    router.push(`/admin/${slug}`);
  };

  return (
    <div>
      <h2 className="mb-2.5">
        <span className="mr-2.5">🖌</span>創建帖子
      </h2>
      <form
        className="grid grid-colso1 auto-rows-min gap-3"
        onSubmit={createPost}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="帖子標題"
        />
        <p>
          <span className="underline mr-2.5">帖子ID:</span>
          {slug}
        </p>
        <button
          type="submit"
          disabled={!isValid}
          className="bg-green text-white w-full max-w-sm mx-auto"
        >
          創建帖子
        </button>
      </form>
    </div>
  );
}
