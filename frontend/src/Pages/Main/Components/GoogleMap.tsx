import React from 'react';
import Styled from './GoogleMap.styled';
import PlaceIcon from '@mui/icons-material/Place';

const GoogleMap = () => {
  return (
    <>
      <Styled.MapBox>
        <div
          id="myMap"
          style={{
            width: '100vw',
            height: '100vh',
          }}
        ></div>
        <PlaceIcon
          sx={{
            zIndex: 1,
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
