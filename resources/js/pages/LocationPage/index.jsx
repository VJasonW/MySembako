import React, { useState } from "react";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";
import { requestUserLocation } from "../../utils/location";

// Gambar ilustrasi location (URL online, atau bisa import asset lokal)
const illustrationUrl =
  "https://cdn-icons-png.flaticon.com/512/535/535239.png"; // Ganti dengan ilustrasi sesuai desain

const LocationPage = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [address, setAddress] = useState("");

  // Reverse geocoding untuk mendapatkan alamat dari koordinat
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      }
      return null;
    } catch (error) {
      console.error("Error getting address:", error);
      return null;
    }
  };

  const handleTurnOnLocation = async () => {
    if (navigator.geolocation) {
      try {
        const location = await requestUserLocation();
        setLocationData(location);
        
        // Coba dapatkan alamat dari koordinat
        const addr = await getAddressFromCoordinates(
          location.latitude,
          location.longitude
        );
        if (addr) {
          setAddress(addr);
        }
        
        setShowLocationPopup(true);
      } catch (error) {
        alert(error.message || "Location permission denied or unavailable.");
      }
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const closeLocationPopup = () => {
    setShowLocationPopup(false);
    // Redirect ke home setelah menutup popup
    setTimeout(() => {
      window.location.href = "/home";
    }, 300);
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* Top Navbar */}
      <TopNavbar />

      {/* Konten utama */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          padding: "16px",
        }}
      >
        <div
          style={{
            marginBottom: "24px",
          }}
        >
          {/* Ilustrasi */}
          <img
            src={illustrationUrl}
            alt="Location Illustration"
            style={{ width: 128, height: 128, margin: "0 auto" }}
          />
        </div>

        {/* Judul */}
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.17rem",
            textAlign: "center",
            marginBottom: 8,
            color: "#181818",
          }}
        >
          Allow Your Location
        </div>

        {/* Deskripsi */}
        <div
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#222222",
            marginBottom: 26,
            maxWidth: 290,
            lineHeight: "20px",
          }}
        >
          We'll use your location to recommend
          <br />
          nearest shops around you
        </div>

        {/* Tombol aktifkan lokasi */}
        <button
          style={{
            display: "block",
            background: "#BF4413",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            padding: "11px 32px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            margin: "0 auto 10px auto",
            width: 200,
            boxShadow: "0 2px 10px rgba(191, 68, 19, 0.10)"
          }}
          onClick={handleTurnOnLocation}
        >
          Turn On Location
        </button>

        {/* Maybe Later */}
        <div
          style={{
            color: "#BF4413",
            opacity: 0.7,
            textAlign: "center",
            fontSize: 15,
            marginTop: 2,
            cursor: "pointer",
            userSelect: "none"
          }}
          onClick={() => {
            window.location.href = "/home";
          }}
        >
          Maybe Later
        </div>
      </div>

      {/* Bottom Navbar */}
      <div style={{ paddingBottom: 20, marginTop: "auto" }}>
        <BottomNavbar />
      </div>

      {/* Popup Lokasi User */}
      {showLocationPopup && locationData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={closeLocationPopup}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#181818",
                }}
              >
                Lokasi User Terkini
              </h2>
              <button
                onClick={closeLocationPopup}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#999",
                  padding: 0,
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Icon Lokasi */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#FFE5D0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="#BF4413"
                  />
                </svg>
              </div>
            </div>

            {/* Informasi Lokasi */}
            <div style={{ marginBottom: "20px" }}>
              {address && (
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Alamat:
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#222",
                      lineHeight: "1.5",
                    }}
                  >
                    {address}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "4px",
                    fontWeight: 600,
                  }}
                >
                  Koordinat:
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#222",
                    fontFamily: "monospace",
                  }}
                >
                  Lat: {locationData.latitude.toFixed(6)}
                  <br />
                  Lng: {locationData.longitude.toFixed(6)}
                </div>
              </div>

              {locationData.accuracy && (
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginBottom: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Akurasi:
                  </div>
                  <div style={{ fontSize: "14px", color: "#222" }}>
                    ±{Math.round(locationData.accuracy)} meter
                  </div>
                </div>
              )}
            </div>

            {/* Tombol OK */}
            <button
              onClick={closeLocationPopup}
              style={{
                width: "100%",
                background: "#BF4413",
                color: "#fff",
                border: "none",
                borderRadius: "24px",
                padding: "12px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(191, 68, 19, 0.20)",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
