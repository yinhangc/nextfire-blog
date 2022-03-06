export default function UsernameMessage({ username, isValid, isLoading }) {
  if (isLoading) {
    return <p className="text-blue font-bold">檢查中...</p>;
  } else if (isValid) {
    return <p className="text-green font-bold">{username} 用戶名稱可使用！</p>;
  } else if (username && username.length < 3) {
    return <p className="text-red font-bold">用戶名稱過短</p>;
  } else if (username && !isValid) {
    return <p className="text-red font-bold">用戶名稱已被使用</p>;
  } else {
    return <p></p>;
  }
}
