export default function ScrollyCanvas({ children }) {
  return (
    <div className="scrolly-container w-full" style={{ background: '#050505' }}>
      {children}
    </div>
  );
}
