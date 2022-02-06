import React from 'react';
import { coor } from 'Types/Map';
import GoogleMapReact from 'google-map-react';
import Styled from './GoogleMap.styled';

const GoogleMap: React.FC<{
  defaultCenter: coor;
  handleChange: (value: GoogleMapReact.ChangeEventValue) => void;
}> = ({ defaultCenter, handleChange }) => {
  return (
    <>
      <Styled.MapBox>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY ?? '' }}
          defaultCenter={defaultCenter}
          defaultZoom={11}
          onChange={handleChange}
        />
        <span style={{ position: 'absolute', top: '50%', left: '50%' }}>
          pin!
        </span>
      </Styled.MapBox>
    </>
  );
};

export default GoogleMap;
