export const formatDuration = (duration: number): string => {
  return `${duration} min`;
};

export const formatPrice = (price: number, currency = '€'): string => {
  return `${price} ${currency}`;
};

export const formatDepth = (depth: {
  minDepth: number;
  maxDepth: number;
}): string => {
  return `${depth.minDepth}-${depth.maxDepth} m`;
};
