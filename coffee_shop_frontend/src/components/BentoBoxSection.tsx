import React from "react";

type BentoBoxSectionProps = {
  className?: string;
  title: string;
  accent?: boolean;
  children?: React.ReactNode;
};

// PUBLIC_INTERFACE
const BentoBoxSection: React.FC<BentoBoxSectionProps> = ({
  className = "",
  title,
  accent = false,
  children,
}) => (
  <section
    className={`flex flex-col rounded-2xl shadow-md p-5 sm:p-8 min-h-[180px] bg-background/80 backdrop-blur-md transition border-2 ${
      accent
        ? "border-accent bg-accent/15"
        : "border-secondary bg-secondary/10"
    } ${className}`}
  >
    <h2
      className={`text-lg sm:text-xl font-bold mb-2 ${
        accent ? "text-primary" : "text-accent"
      }`}
    >
      {title}
    </h2>
    <div className="flex-1">{children}</div>
  </section>
);

export default BentoBoxSection;
