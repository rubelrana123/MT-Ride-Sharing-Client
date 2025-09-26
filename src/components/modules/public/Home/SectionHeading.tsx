export default function SectionHeading({ title, desc }: { title: string, desc: string}) {
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl capitalize font-ride-title font-bold text-primary mb-5">
        {title}
      </h2>
      <p className="text-muted-foreground text-xl max-w-xl mx-auto">{desc}</p>
    </div>
  );
}
