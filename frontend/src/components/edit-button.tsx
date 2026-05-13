import type { ButtonHTMLAttributes } from "react";
import { LuPencilLine } from "react-icons/lu";

export function EditButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="cursor-pointer rounded bg-[#faa850] font-bold text-white transition hover:bg-[#eaa55b]"
      {...props}
    >
      <LuPencilLine />
    </button>
  );
}
