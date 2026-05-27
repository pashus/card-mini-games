import { cn } from "@/lib/utils";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { Link, type LinkProps } from "react-router-dom";

interface TextArrowProps extends LinkProps {
  text?: string;
  where?: "left" | "right";
  className?: string;
  disabled?: boolean;
}

export function TextArrow({
  text,
  where,
  className,
  disabled,
  ...props
}: TextArrowProps) {
  return (
    <Link
      {...props}
      className={cn(
        "flex items-start gap-px text-3xl font-bold tracking-wider transition hover:text-black",
        className,
        disabled && "pointer-events-none opacity-50 select-none",
      )}
    >
      {where === "left" && <LuArrowBigLeft className="-translate-x-1" />}
      <span className="text-xl sm:inline">{text}</span>
      {where === "right" && <LuArrowBigRight className="translate-x-1" />}
    </Link>
  );
}
