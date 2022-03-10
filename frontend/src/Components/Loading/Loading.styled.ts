import styled from 'styled-components';

const LoadingBox = styled.div<{ bgcolor: string }>`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.bgcolor};
  span {
    position: absolute;
    top: 40%;
    font-size: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Styled = { LoadingBox };

export default Styled;
