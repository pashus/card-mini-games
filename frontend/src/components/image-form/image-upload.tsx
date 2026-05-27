"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Loader2, GripVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DeleteButton } from "../delete-button";
// import { ImageCropDialog } from "./image-crop-dialog";
// import { ImagePreviewDialog } from "./image-preview-dialog";

export interface ImageItem {
  /** Unique identifier for the image */
  id: string;
  /** URL of the image (can be data URL, blob URL, or remote URL) */
  url: string;
  /** Original file (if uploaded locally) */
  file?: File;
}

interface ImageUploadProps {
  /** Array of image items */
  images: ImageItem[];
  /** Callback when images change */
  onChange: (images: ImageItem[]) => void;
  /** Maximum number of images allowed */
  maxImages?: number;
  /** Allowed MIME types */
  allowedTypes?: string[];
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Aspect ratio for crop (default: 4/3) */
  aspectRatio?: number;
  /** Whether cropping is enabled */
  enableCrop?: boolean;
  /** Whether preview is enabled */
  enablePreview?: boolean;
  /** Whether reordering is enabled */
  enableReorder?: boolean;
  /** Whether to show cover badge on first image */
  showCoverBadge?: boolean;
  /** Label for cover badge */
  coverBadgeLabel?: string;
  /** Custom upload handler - if not provided, images are stored as data URLs */
  onUpload?: (file: File) => Promise<string>;
  /** Called when crop is complete */
  onCropComplete?: (imageId: string, croppedBlob: Blob) => Promise<string>;
}

const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * ImageUpload - A complete image upload component with drag & drop, crop, preview, and reorder
 *
 * Features:
 * - Drag and drop file upload
 * - Multiple file selection
 * - Image validation (type, size)
 * - Image cropping (react-easy-crop)
 * - Image preview with aspect ratio comparison
 * - Cover image selection (first image is cover)
 * - Drag to reorder images
 * - Remove individual images
 * - Customizable grid layout
 *
 * Usage:
 * ```tsx
 * const [images, setImages] = useState<ImageItem[]>([]);
 *
 * <ImageUpload
 *   images={images}
 *   onChange={setImages}
 *   maxImages={10}
 *   enableCrop
 *   enablePreview
 *   showCoverBadge
 * />
 * ```
 */
export function ImageUpload({
  images,
  onChange,
  maxImages = 10,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  // aspectRatio = 4 / 3,
  // enableCrop = false,
  // enablePreview = false,
  enableReorder = false,
  showCoverBadge = false,
  coverBadgeLabel = "Cover",
  onUpload,
  // onCropComplete,
}: ImageUploadProps) {
  // const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate unique ID
  const generateId = () =>
    `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Validate a single file
  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      const formats = allowedTypes
        .map((t) => t.split("/")[1].toUpperCase())
        .join(", ");
      return `File ${file.name}: invalid format. Allowed: ${formats}`;
    }
    if (file.size > maxFileSize) {
      const maxSizeMB = (maxFileSize / (1024 * 1024)).toFixed(0);
      return `File ${file.name}: exceeds size limit. Maximum ${maxSizeMB}MB`;
    }
    return null;
  };

  // Convert file to data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection/drop
  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);

      // Check if we would exceed max images
      if (images.length + fileArray.length > maxImages) {
        // toast({
        //   title: "Error",
        //   description: `Maximum ${maxImages} images allowed`,
        //   variant: "destructive",
        // });
        return;
      }

      // Validate all files first
      const errors: string[] = [];
      const validFiles: File[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      // Show errors if any
      if (errors.length > 0) {
        // toast({
        //   title: "Validation Errors",
        //   description: errors.join("\n"),
        //   variant: "destructive",
        // });
      }

      // Process valid files
      if (validFiles.length > 0) {
        setUploading(true);
        try {
          const newImages: ImageItem[] = [];

          for (const file of validFiles) {
            let url: string;

            if (onUpload) {
              // Use custom upload handler
              url = await onUpload(file);
            } else {
              // Convert to data URL for local preview
              url = await fileToDataUrl(file);
            }

            newImages.push({
              id: generateId(),
              url,
              file,
            });
          }

          onChange([...images, ...newImages]);

          // toast({
          //   title: "Success",
          //   description: `${newImages.length} image(s) added`,
          // });
        } catch (error: unknown) {
          // const message =
          //   error instanceof Error ? error.message : "Failed to process images";
          // toast({
          //   title: "Error",
          //   description: message,
          //   variant: "destructive",
          // });
        } finally {
          setUploading(false);
        }
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [images, onChange, maxImages, onUpload, allowedTypes, maxFileSize],
  );

  // Drag handlers for drop zone
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  // Set as cover (move to first position)
  const handleSetAsCover = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const [movedImage] = newImages.splice(index, 1);
    newImages.unshift(movedImage);
    onChange(newImages);
  };

  // Handle crop complete
  // const handleCropComplete = async (
  //   index: number,
  //   croppedImage: Blob | string,
  // ) => {
  //   const image = images[index];

  //   let newUrl: string;

  //   if (typeof croppedImage === "string") {
  //     // It's already a data URL
  //     newUrl = croppedImage;
  //   } else if (onCropComplete) {
  //     // Use custom handler to upload cropped image
  //     newUrl = await onCropComplete(image.id, croppedImage);
  //   } else {
  //     // Convert blob to data URL
  //     newUrl = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result as string);
  //       reader.readAsDataURL(croppedImage);
  //     });
  //   }

  //   const newImages = [...images];
  //   newImages[index] = { ...image, url: newUrl };
  //   onChange(newImages);
  // };

  // Drag handlers for reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!enableReorder) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (!enableReorder || draggedIndex === null) return;
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (!enableReorder || draggedIndex === null || dragOverIndex === null) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    if (draggedIndex !== dragOverIndex) {
      const newImages = [...images];
      const [movedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(dragOverIndex, 0, movedImage);
      onChange(newImages);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Build grid classes
  const maxSizeMB = (maxFileSize / (1024 * 1024)).toFixed(0);
  const formatsList = allowedTypes
    .map((t) => t.split("/")[1].toUpperCase())
    .join(", ");

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary",
          uploading && "pointer-events-none opacity-50",
          images.length > 0 && "hidden",
        )}
        onClick={openFileDialog}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(",")}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {uploading ? (
            <>
              <Loader2 className="text-primary h-10 w-10 animate-spin" />
              <p className="text-muted-foreground text-sm">Загрузка...</p>
            </>
          ) : (
            <>
              <Upload className="text-muted-foreground h-10 w-10" />
              <div>
                <p className="text-sm font-medium">
                  Переместите изображение сюда или{" "}
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-primary hover:underline"
                  >
                    выберите файл
                  </button>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {formatsList} до {maxSizeMB}MB
                </p>
              </div>
              <p className="text-muted-foreground text-xs">
                {images.length} из {maxImages} изображений
              </p>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2">
          {images.map((image, index) => (
            <Card
              key={image.id}
              className={cn(
                "group relative overflow-hidden py-0",
                enableReorder && "cursor-move",
                draggedIndex === index && "opacity-50",
                dragOverIndex === index && "ring-primary ring-2",
              )}
              draggable={enableReorder}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Quick actions */}
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  {/* Set as Cover Button */}
                  {showCoverBadge && index !== 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      onClick={() => handleSetAsCover(index)}
                      title="Set as cover"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Remove Button */}
                  <DeleteButton
                    type="button"
                    className="text-3xl"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>

                {/* Cover Badge */}
                {showCoverBadge && index === 0 && (
                  <div className="bg-primary text-primary-foreground absolute top-2 left-2 rounded px-2 py-1 text-xs">
                    {coverBadgeLabel}
                  </div>
                )}

                {/* Drag Handle */}
                {enableReorder && (
                  <div className="bg-background/80 absolute right-2 bottom-2 rounded p-1">
                    <GripVertical className="text-muted-foreground h-4 w-4" />
                  </div>
                )}

                {/* Preview Button */}
                {/* {enablePreview && (
                  <ImagePreviewDialog
                    imageUrl={image.url}
                    imageName={`Image ${index + 1}`}
                    aspectRatio={aspectRatio}
                  />
                )} */}

                {/* Crop Button */}
                {/* {enableCrop && (
                  <ImageCropDialog
                    imageUrl={image.url}
                    imageName={`Image ${index + 1}`}
                    aspectRatio={aspectRatio}
                    onCropComplete={(croppedImage) =>
                      handleCropComplete(index, croppedImage)
                    }
                  />
                )} */}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {/* {images.length === 0 && !uploading && (
        <div className="text-muted-foreground py-8 text-center">
          <ImageIcon className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-sm">No images</p>
        </div>
      )} */}
    </div>
  );
}
