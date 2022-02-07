import React from 'react';
import { coor } from 'Types/Map';
import GoogleMapReact from 'google-map-react';
import Styled from './GoogleMap.styled';
import PlaceIcon from '@mui/icons-material/Place';

const GoogleMap: React.FC<{
  defaultCenter: coor;
  handleMapMove: (value: GoogleMapReact.ChangeEventValue) => void;
}> = ({ defaultCenter, handleMapMove }) => {
  const handleApiLoaded = (map: any, maps: any) => {
    // use map and maps objects
    console.log(map);
    console.log(maps);
  };
  return (
    <>
      <Styled.MapBox>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY ?? '' }}
          defaultCenter={defaultCenter}
          defaultZoom={15}
          onChange={handleMapMove}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
        <PlaceIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: 'red',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Styled.MapBox>
    </>
  );
};

export default GoogleMap;
