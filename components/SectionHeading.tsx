type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""} ${className}`}
    >
      {label && (
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-violet-400/80 mb-3">
          {label}
        </p>
      )}
      <h2 className="font-barlow font-bold text-4xl md:text-5xl text-zinc-50 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
