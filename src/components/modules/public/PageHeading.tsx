
export default function PageHeading ({ title, desc }: { title: string, desc: string}) {
  return (
    <div className="text-center mb-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl capitalize font-ride-title font-bold text-black dark:text-white mb-5">
        {title}
      </h1>
      <p className="text-muted-foreground text-xl max-w-xl mx-auto">{desc}</p>
    </div>
  );
};
