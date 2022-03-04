import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Card from '../ui/Card';

export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Card className="grid grid-cols-1 auto-rows-min">
      <h1>{post?.title}</h1>
      <span className="text-sm mb-6">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-blue font-bold">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Card>
  );
}
