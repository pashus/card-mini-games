import type { ButtonHTMLAttributes } from "react";
import { IoClose } from "react-icons/io5";

export function DeleteButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-destructive cursor-pointer rounded font-bold text-white transition hover:bg-[#cb5433]"
      {...props}
    >
      <IoClose />
    </button>
  );
}
