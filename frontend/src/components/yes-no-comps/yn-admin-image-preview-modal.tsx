import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface YnAdminImagePreviewModalProps {
  image: string;
  title: string;
}

export function YnAdminImagePreviewModal({
  image,
  title,
}: YnAdminImagePreviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-12 cursor-zoom-in overflow-hidden p-0"
        >
          <img src={image} alt="" className="size-12 rounded-md object-cover" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="pr-8">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <img
          src={image}
          alt={title}
          className="max-h-[75svh] w-full rounded-md object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
