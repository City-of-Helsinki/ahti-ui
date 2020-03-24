const localizations: Record<string, string[]> = {
  en: ['N', 'S', 'E', 'W'],
  fi: ['P', 'E', 'I', 'L'],
};

const toDegreesMinutesAndSeconds = (coordinate: number): string => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return degrees + '° ' + minutes + "' " + seconds + "''";
};

const localizedToDMS = (
  latitude: number,
  longitude: number,
  locale: string
): string => {
  const latitudeDMS = toDegreesMinutesAndSeconds(latitude);
  const longitudeDMS = toDegreesMinutesAndSeconds(longitude);

  const translations = localizations[locale]
    ? localizations[locale]
    : localizations['en'];
  const latitudeCardinal = latitude >= 0 ? translations[0] : translations[1];
  const longitudeCardinal = longitude >= 0 ? translations[2] : translations[3];

  return (
    latitudeDMS +
    ' ' +
    latitudeCardinal +
    ', ' +
    longitudeDMS +
    ' ' +
    longitudeCardinal
  );
};

export default localizedToDMS;
