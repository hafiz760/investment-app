import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  alt?: string;
  className?: string;
}

export function Logo({
  size = "md",
  alt = "InvestaX Logo",
  className,
}: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
  };

  return (
    <Image
      src="/images/logo.png"
      alt={alt}
      {...dimensions[size]}
      priority
      className={`rounded-md ${className}`}
    />
  );
}
