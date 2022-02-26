import React, { useState, useEffect, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, Title } from './Components';
import { coor } from 'Types/Map';
import { useNavigate } from 'react-router-dom';
import GroupService from 'Network/GroupService';
import Styled from './Main.styled';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { MapContext } from 'App';

const defaultCenter = {
  lat: 37.485774,
  lng: 127.0655764,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { kakao } = window;

const Main = () => {
  const { curLocation, setMap, setCurLocation } = useContext(MapContext);
  const navi = useNavigate();
  const theme = useTheme();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [center, setCenter] = useState<coor>(defaultCenter);

  const handleMapMove = (value: GoogleMapReact.ChangeEventValue) => {
    console.log(value.center);
    setCenter(value.center);
  };
  const getCurLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // @ts-ignore
      setCurLocation(position);
      return position;
    });
  };

  useEffect(() => {
    if (!curLocation) getCurLocation();
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(
        curLocation ? curLocation.coords.latitude : defaultCenter.lat,
        curLocation ? curLocation.coords.longitude : defaultCenter.lng
      ),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, [curLocation]);

  const handleStartButtonTabbed = async () => {
    const result = await GroupService.getGroupId();

    navi(`/${result}`);
  };

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <GlobalStyled.Cloud bgcolor={theme.myPalette.cloud}>
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
      <Title />
      <GoogleMap />
      <Styled.VFlexBox>
        <TextField id="outlined-basic" variant="outlined" />
        <Button variant="contained" onClick={handleStartButtonTabbed}>
          시작 하기x
        </Button>
      </Styled.VFlexBox>
      <span>@Team ChanSu</span>
    </GlobalStyled.ThemeBox>
  );
};

export default Main;
