import React from 'react';
import GoogleMapReact from 'google-map-react';
import { coor } from '../../../Types/Map';

const GoogleMap: React.FC<{
  defaultCenter: coor;
  handleChange: (value: GoogleMapReact.ChangeEventValue) => void;
}> = ({ defaultCenter, handleChange }) => {
  return (
    <div style={{ height: '400px', width: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY ?? '' }}
        defaultCenter={defaultCenter}
        defaultZoom={11}
        onChange={handleChange}
      />
    </div>
  );
};

export default GoogleMap;
