export default function UserProfile({ user }) {
  return (
    <div className="grid grid-cols-1 auto-rows-min gap-2 justify-items-center">
      <img
        src={user?.photoURL || '/icon.png'}
        className="rounded-full w-28 h-28"
      />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName || '匿名'}</h1>
    </div>
  );
}
