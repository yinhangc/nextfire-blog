import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="grid place-items-center auto-rows-min gap-4">
      <h1 className="text-center">404 - 頁面不存在 🙁</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="300"
        height="182"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <button className="text-white bg-blue w-[10rem]">返回</button>
      </Link>
    </main>
  );
}
