import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap } from './Components';
import { coor } from 'Types/Map';
import { Box } from '@mui/material';

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
    <Box sx={{ width: '100%', height: '100vh' }}>
      <GoogleMap defaultCenter={defaultCenter} handleChange={handleChange} />
    </Box>
  );
};

export default Main;
