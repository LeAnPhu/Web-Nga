import React, { useState, useEffect } from "react";

const Location = () => {
  const [city, setCity] = useState("Đang lấy vị trí...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          setCity(data.address.city || data.address.town || "Không xác định");
        } catch (error) {
          setCity("Không lấy được vị trí");
        }
      },
      (error) => {
        setCity("Không cho phép truy cập vị trí");
      }
    );
  }, []);

  return <span>{city}</span>;
};

export default Location;
