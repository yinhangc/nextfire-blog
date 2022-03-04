import AuthCheck from '../../components/admin/AuthCheck';
import CreateNewPost from '../../components/admin/CreateNewPost';
import PostList from '../../components/admin/PostList';

export default function AdminPostsPage(props) {
  return (
    <main className="min-h-full">
      <AuthCheck>
        <div className="grid grid-cols-1 auto-rows-min gap-6">
          <PostList />
          <CreateNewPost />
        </div>
      </AuthCheck>
    </main>
  );
}
