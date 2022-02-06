import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap } from './Components';
import { coor } from 'Types/Map';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupService from 'Network/GroupService';

const defaultCenter = {
  lat: 59.95,
  lng: 30.33,
};

const Main = () => {
  const navi = useNavigate();
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
    <Box sx={{ width: '100%', height: '100vh' }}>
      <GoogleMap defaultCenter={defaultCenter} handleMapMove={handleMapMove} />
      <div> 이름 입력</div>
      <div onClick={handleStartButtonTabbed}> 시작 하기</div>
    </Box>
  );
};

export default Main;
