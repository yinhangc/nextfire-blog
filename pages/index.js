import { useState } from 'react';
import Loader from '../components/ui/Loader';
import PostFeed from '../components/shared/PostFeed';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';

const LIMIT = 1;

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts); // Fetch additional posts when user requests
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    const last = posts[posts.length - 1];
    if (last) {
      setLoading(true);
      const lastDocFsTimestamp =
        typeof last.createdAt === 'number'
          ? fromMillis(last.createdAt)
          : last.createdAt;
      const query = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocFsTimestamp)
        .limit(LIMIT);
      const newPosts = (await query.get()).docs.map((doc) => doc.data());
      setPosts([...posts, ...newPosts]);
      setLoading(false);
      if (newPosts.length < LIMIT) setPostsEnd(true);
    } else {
      setPostsEnd(true);
    }
  };

  return (
    <main className="grid auto-rows-min gap-6">
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button className="mx-auto" onClick={getMorePosts}>
          加載更多
        </button>
      )}
      <Loader show={loading} />
      {postsEnd && (
        <p className="mx-auto">
          <span className="mr-2.5">✅</span>已加載全部內容
        </p>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);
  return {
    props: { posts },
  };
}
