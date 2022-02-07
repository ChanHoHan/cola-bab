import styled from 'styled-components';
import { Box } from '@mui/material';

const MapBox = styled(Box)`
  && {
    height: 70vw;
    width: 70vw;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 4px 2px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 6px 0px rgb(0 0 0 / 12%);
  }
`;

const Styled = {
  MapBox,
};

export default Styled;
