import React from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { useTheme } from '@mui/material';
import Styled from './Error.styled';

const Error = () => {
  const theme = useTheme();
  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <Styled.ErrorBox>
        <span style={{ fontSize: '6rem' }}>🍚</span>
        <h1>404</h1>
        <h3>Page Not Found</h3>
      </Styled.ErrorBox>
    </GlobalStyled.ThemeBox>
  );
};

export default Error;
