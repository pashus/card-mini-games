import type { ButtonHTMLAttributes } from "react";
import { LuPencilLine } from "react-icons/lu";

export function EditButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="cursor-pointer rounded bg-[#faa850] font-bold text-white hover:bg-[#ffb565]"
      {...props}
    >
      <LuPencilLine />
    </button>
  );
}
