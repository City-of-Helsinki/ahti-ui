import { Image } from '../../domain/api/generated/types.d';

const getFirstImageUrl = (
  images?: Image[],
  placeholder = '/images/placeholder.jpeg'
): string => {
  if (images && images.length > 0) {
    return images[0].url;
  }
  return placeholder;
};

export { getFirstImageUrl };
