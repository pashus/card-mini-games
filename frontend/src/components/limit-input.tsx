import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";

interface LimitInputProps {
  limit: number;
  onLimitChange: (limit: number) => void;
}

export function LimitInput({ limit, onLimitChange }: LimitInputProps) {
  const limitInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();

        const value = Number(limitInputRef.current?.value);
        onLimitChange(value);
      }}
    >
      <Input
        id="limit"
        ref={limitInputRef}
        placeholder="20.."
        min={1}
        className="pr-10"
        defaultValue={limit}
        type="number"
      />
      <Label className="text-xs" htmlFor="limit">
        лимит
      </Label>

      <Button
        size="icon"
        type="submit"
        variant="ghost"
        className="absolute top-1/3 right-1 -translate-y-1/2 hover:bg-transparent"
      >
        <Plus />
      </Button>
    </form>
  );
}
