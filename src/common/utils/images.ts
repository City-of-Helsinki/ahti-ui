import { Image } from '../../domain/api/generated/types.d';

export const getRandomImageUrl = (
  images: Image[] | undefined,
  placeholder: string | null = '/images/placeholder.jpeg'
): string | null => {
  if (images && images.length > 0) {
    return images[Math.floor(Math.random() * images.length)].url;
  }
  return placeholder;
};

export const getFirstImageUrl = (
  images: Image[] | undefined,
  placeholder: string | null = '/images/placeholder.jpeg'
): string | null => {
  if (images && images.length > 0) {
    return images[0].url;
  }
  return placeholder;
};
