import React, { useState } from 'react';
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

const defaultCenter = {
  lat: 37.5,
  lng: 126.99,
};

const Main = () => {
  const navi = useNavigate();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [center, setCenter] = useState<coor>(defaultCenter);
  const handleMapMove = (value: GoogleMapReact.ChangeEventValue) => {
    console.log(value.center);
    setCenter(value.center);
  };

  const handleStartButtonTabbed = async () => {
    // setIsLoading(true);
    const result = await GroupService.getGroupId();
    // setIsLoading(false);
    navi(`/${result}`);
  };

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <Title />
      <GoogleMap defaultCenter={defaultCenter} handleMapMove={handleMapMove} />
      <Styled.VFlexBox>
        <TextField id="outlined-basic" variant="outlined" />
        <Button variant="contained" onClick={handleStartButtonTabbed}>
          시작 하기
        </Button>
      </Styled.VFlexBox>
      <span>@Team ChanSu</span>
    </GlobalStyled.ThemeBox>
  );
};

export default Main;
