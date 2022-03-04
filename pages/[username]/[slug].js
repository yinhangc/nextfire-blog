import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '../../components/shared/PostContent';

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post; // SSR / realtime

  return (
    <main className="grid grid-cols-[1fr,max-content] gap-4">
      <PostContent post={post} />
      <aside className="bg-white p-8 rounded-lg shadow">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
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
