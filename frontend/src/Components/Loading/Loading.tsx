import { useTheme } from '@mui/material';
import React from 'react';
import Styled from './Loading.styled';
import GlobalStyled from 'Components/GlobaStyled/GlobalStyled.styled';

const Loading = () => {
  const theme = useTheme();
  return (
    <Styled.LoadingBox bgcolor={theme.myPalette.backgroundLoading}>
      <span
        style={{
          color: theme.myPalette.foreground,
        }}
      >
        Loading...
      </span>
      <GlobalStyled.Cloud bgcolor={theme.myPalette.cloud}>
        <div className="clouds">
          <div className="cloud bounce" />
        </div>
      </GlobalStyled.Cloud>
    </Styled.LoadingBox>
  );
};

export default Loading;
