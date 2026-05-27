import type { ButtonHTMLAttributes } from "react";
import { LuPencilLine } from "react-icons/lu";

export function EditButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-edit-button hover:bg-edit-button-hover cursor-pointer rounded font-bold text-white transition"
      {...props}
    >
      <LuPencilLine />
    </button>
  );
}
