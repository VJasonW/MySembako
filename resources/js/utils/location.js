/**
 * Utility functions for handling user location
 */

export const CITY_BOXES = [
  { name: "Jakarta", lat: [-6.4, -6.0], lng: [106.6, 107.0] },
  { name: "Semarang", lat: [-7.1, -6.8], lng: [110.3, 110.6] },
  { name: "Surabaya", lat: [-7.4, -7.1], lng: [112.6, 112.9] },
  { name: "Jogja", lat: [-7.9, -7.6], lng: [110.3, 110.6] },
];

export const cityFromCoords = (lat, lng) => {
  const match = CITY_BOXES.find(
    (b) => lat >= b.lat[0] && lat <= b.lat[1] && lng >= b.lng[0] && lng <= b.lng[1]
  );
  return match ? match.name : null;
};

/**
 * Request user location using Geolocation API
 * @param {Object} options - Geolocation options
 * @returns {Promise<Object>} Promise that resolves with location data
 */
export const requestUserLocation = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
        });
      },
      (error) => {
        let msg = 'Gagal mengakses lokasi. ';
        if (error.code === error.PERMISSION_DENIED) {
          msg += 'Izin lokasi tidak diberikan.';
        } else if (error.code === error.TIMEOUT) {
          msg += 'Waktu permintaan lokasi habis.';
        } else {
          msg += 'Lokasi tidak tersedia.';
        }
        reject(new Error(msg));
      },
      { ...defaultOptions, ...options }
    );
  });
};
