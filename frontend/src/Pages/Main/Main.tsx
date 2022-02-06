import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap } from './Components';
import { coor } from '../../Types/Map';
const defaultCenter = {
  lat: 59.95,
  lng: 30.33,
};

const Main = () => {
  const [center, setCenter] = useState<coor>(defaultCenter);
  const handleChange = (value: GoogleMapReact.ChangeEventValue) => {
    console.log(value.center);
    setCenter(value.center);
  };

  return (
    <>
      <GoogleMap defaultCenter={defaultCenter} handleChange={handleChange} />
      <span style={{ position: 'absolute', top: '50%', left: '50%' }}>
        pin!
      </span>
    </>
  );
};

export default Main;
