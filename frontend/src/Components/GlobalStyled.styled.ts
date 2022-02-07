import { Box } from '@mui/material';
import styled from 'styled-components';

const ThemeBox = styled(Box)<{ bgcolor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  && {
    width: 100%;
    height: 100vh;
    background: ${(props) => props.bgcolor ?? 'black'};
  }
`;
const GlobalStyled = { ThemeBox };

export default GlobalStyled;
