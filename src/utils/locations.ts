import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const getLocation = async () => {
  try {
    const location = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });

    const { coords } = location as GeolocationResponse;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch reverse geocoding data. Status: ${response.status}`,
      );
    }

    const allInfo = await response.json();

    return allInfo;
  } catch (error) {
    console.warn('Error:', error);
    // Handle error as needed (e.g., show a user-friendly message)
    throw error; // Propagate the error to the caller if needed
  }
};

export { getLocation };
