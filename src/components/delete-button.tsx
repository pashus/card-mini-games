import { useDeleteCard } from "@/hooks/use-delete-card";
import { IoClose } from "react-icons/io5";

export function DeleteButton({ cardId }: { cardId: string }) {
  const { mutate } = useDeleteCard();

  return (
    <button
      onClick={() => mutate(cardId)}
      className="bg-destructive cursor-pointer rounded font-bold text-white hover:bg-[#f32a34]"
    >
      <IoClose />
    </button>
  );
}
