export default function UserProfile({ user }) {
  return (
    <div className="grid grid-cols-1 auto-rows-min gap-2 justify-items-center">
      <img src={user?.photoURL || null} className="rounded-full" />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName || 'Unknown'}</h1>
    </div>
  );
}
