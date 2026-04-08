export default function ScrollyOverlay({ sections = [] }) {
  return (
    <div className="w-full">
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          {section.content}
        </section>
      ))}
    </div>
  );
}
