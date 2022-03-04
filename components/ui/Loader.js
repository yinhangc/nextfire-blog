export default function Loader({ show, className }) {
  return show ? (
    <div className={`loader mx-auto${className ? className : ''}`}></div>
  ) : null;
}
