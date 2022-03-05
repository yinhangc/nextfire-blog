import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '../../components/shared/PostContent';
import Loader from '../../components/ui/Loader';
import AuthCheck from '../../components/admin/AuthCheck';
import LikeButton from '../../components/shared/LikeButton';
import Link from 'next/link';

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost, loading] = useDocumentData(postRef);

  const post = realtimePost || props.post; // SSR / realtime

  return (
    <main className="grid gird-cols-1 auto-rows-min sm:grid-cols-[1fr,max-content] gap-4">
      {loading && <Loader show className=" col-span-2" />}
      {!loading && (
        <>
          <PostContent post={post} />
          <aside className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center gap-4">
            <div className="font-bold">{post.likeCount || 0} 💗</div>
            <AuthCheck
              fallback={
                <Link href="/auth">
                  <button>
                    <span className="mr-2.5">❤️</span>請先登入
                  </button>
                </Link>
              }
            >
              <LikeButton postRef={postRef} />
            </AuthCheck>
          </aside>
        </>
      )}
    </main>
  );
}

// ISR: Rebuild the page on a server at a time interval, can fallback to SSR if not found
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post;
  let path;
  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000,
  };
}

// Determine which actual page can be rendered
export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup('posts').get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
}
