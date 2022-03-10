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

const Cloud = styled.div<{ bgcolor: string }>`
  position: absolute;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;

  .clouds {
    position: relative;
    overflow: visible;
    top: 10vw;
  }

  .cloud {
    width: 30vw;
    height: 10vw;
    background: ${(props) => props.bgcolor ?? 'white'};
    border-radius: 100px;
    position: absolute;
  }

  .cloud:before,
  .cloud:after {
    content: '';
    overflow: visible;
    position: absolute;
    background: ${(props) => props.bgcolor ?? 'white'};
    top: -10vw;
    left: 6vw;
    width: 18vw;
    height: 18vw;
    border-radius: 50%;
  }

  .x1 {
    top: 20vh;
    animation: moveclouds 15s linear infinite;
  }

  .x2 {
    top: 40vh;
    left: 10vw;
    transform: scale(0.6);
    opacity: 0.6;
    animation: moveclouds 25s linear infinite;
  }

  .x3 {
    left: 50vw;
    top: 60vh;
    transform: scale(0.8);
    opacity: 0.8;
    animation: moveclouds 20s linear infinite;
  }

  .x4 {
    left: 15vw;
    top: 70vh;
    transform: scale(0.75);
    opacity: 0.75;
    animation: moveclouds 18s linear infinite;
  }

  .x5 {
    left: 30vw;
    top: 80vh;
    transform: scale(0.8);
    opacity: 0.8;
    animation: moveclouds 20s linear infinite;
  }

  .bounce {
    top: 50vh;
    left: 50%;
    opacity: 0.8;
    animation: bounce 2s linear infinite;
  }

  @keyframes bounce {
    0% {
      transform: translate(-50%, -40px);
    }
    50% {
      transform: translate(-50%, 0px);
    }
    100% {
      transform: translate(-50%, -40px);
    }
  }

  @keyframes moveclouds {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-100vw);
    }
  }
`;

const GlobalStyled = { ThemeBox, Cloud };

export default GlobalStyled;
