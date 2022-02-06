import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

type coor = {
  lat: number;
  lng: number;
};

const defaultCenter = {
  lat: 59.95,
  lng: 30.33,
};

const ColaBab = () => {
  const [center, setCenter] = useState<coor>(defaultCenter);
  const handleChange = (value: GoogleMapReact.ChangeEventValue) => {
    console.log(value.center);
    setCenter(value.center);
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY ?? '' }}
          defaultCenter={defaultCenter}
          defaultZoom={11}
          onChange={handleChange}
        />
      </div>
      <span style={{ position: 'absolute', top: '50%', left: '50%' }}>
        pin!
      </span>
    </>
  );
};

export default ColaBab;
