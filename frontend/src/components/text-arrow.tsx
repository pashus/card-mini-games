import { cn } from "@/lib/utils";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { Link, type LinkProps } from "react-router-dom";

interface TextArrowProps extends LinkProps {
  text?: string;
  where?: "left" | "right";
  className?: string;
}

export function TextArrow({
  text,
  where,
  className,
  ...props
}: TextArrowProps) {
  return (
    <Link
      {...props}
      className={cn(
        "flex items-start gap-1 text-3xl font-bold transition hover:text-black",
        className,
      )}
    >
      {where === "left" && <LuArrowBigLeft className="ttranslate-y-0.5" />}
      <span className="text-xl sm:inline">{text}</span>
      {where === "right" && <LuArrowBigRight className="translate-y-0.5" />}
    </Link>
  );
}
