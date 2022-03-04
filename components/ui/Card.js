export default function Card(props) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow  ${props.className ?? ''}`}>
      {props.children}
    </div>
  );
}
