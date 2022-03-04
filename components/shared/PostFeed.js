import Link from 'next/link';
import Card from '../ui/Card';

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Card className="grid auto-rows-min gap-2 hover:scale-105 cursor-pointer transition-all">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer className="flex justify-between item-center">
        <span>
          {wordCount} 字・{minutesToRead} 分鐘閱讀
        </span>
        <span>
          <span className="mr-2">💗</span>
          {post.heartCount || 0}
        </span>
      </footer>
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>
          {post.published ? (
            <p className="text-green font-bold">已刊登</p>
          ) : (
            <p className="text-red font-bold">未刊登</p>
          )}
        </>
      )}
    </Card>
  );
}
