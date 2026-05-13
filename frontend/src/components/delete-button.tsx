import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { IoClose } from "react-icons/io5";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function DeleteButton({ className, ...props }: DeleteButtonProps) {
  return (
    <button
      className={cn(
        className,
        "bg-destructive cursor-pointer rounded font-bold text-white transition hover:bg-[#cb5433]",
      )}
      {...props}
    >
      <IoClose />
    </button>
  );
}
