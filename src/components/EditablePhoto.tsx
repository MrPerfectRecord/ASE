"use client";
import { usePhoto, type PhotosConfig } from "@/lib/photos";

interface EditablePhotoProps {
  /** Slot key from photos config — what this image represents in the app. */
  slot: keyof PhotosConfig;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
}

/**
 * Drop-in replacement for an `<img>` whose src is editable from /admin/dev.
 * While the URL is loading (empty string), renders a transparent placeholder
 * with the same className so layout stays stable but no stale/original image
 * is ever shown.
 */
export default function EditablePhoto({
  slot,
  alt,
  className,
  style,
  loading,
}: EditablePhotoProps) {
  const url = usePhoto(slot);
  if (!url) {
    // Placeholder — same dimensions/className as the img, transparent so the
    // parent's background shows through. Users briefly see empty space while
    // the photo URL is fetched, never a stale/original image.
    return (
      <div
        className={className}
        style={style}
        aria-label={alt}
        role="img"
      />
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
    />
  );
}
