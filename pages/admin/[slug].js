import AuthCheck from '../../components/admin/AuthCheck';
import PostEdit from '../../components/admin/PostEdit';

export default function AdminPostEdit(propd) {
  return (
    <main>
      <AuthCheck>
        <PostEdit />
      </AuthCheck>
    </main>
  );
}
