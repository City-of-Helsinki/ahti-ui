import { FEATURES_features_edges_node_properties_images } from '../../domain/api/generatedTypes/FEATURES';
import { PROMOTIONS_features_edges_node_properties_images } from '../../domain/api/generatedTypes/PROMOTIONS';

const getFirstImageUrl = (
  images:
    | PROMOTIONS_features_edges_node_properties_images[]
    | FEATURES_features_edges_node_properties_images[]
    | null,
  placeholder = '/images/placeholder.jpeg'
): string => {
  if (images && images.length > 0) {
    return images[0].url;
  }
  return placeholder;
};

export { getFirstImageUrl };
