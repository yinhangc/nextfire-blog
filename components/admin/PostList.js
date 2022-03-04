import { useEffect, useState } from 'react';
import { auth, firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from '../shared/PostFeed';
import Loader from '../ui/Loader';

export default function PostList(props) {
  const query = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .orderBy('createdAt');
  // Client-side render
  const [snapshot, loading, error] = useCollection(query);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(snapshot?.docs.map((doc) => doc.data()));
    console.log(posts);
  }, [snapshot]);

  return (
    <div>
      <h2 className="mb-2.5">
        <span className="mr-2.5">📝</span>管理帖子
      </h2>
      {loading && <Loader show />}
      {!loading && posts && <PostFeed posts={posts} admin />}
    </div>
  );
}
