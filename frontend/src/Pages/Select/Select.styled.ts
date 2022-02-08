import styled from 'styled-components';
import TinderCard from 'react-tinder-card';

const CardBox = styled(TinderCard)<{ bgcolor: string }>`
  position: absolute;
  width: 80vw;
  height: 80vh;
  border-radius: 30px;
  top: 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.bgcolor || 'white'};
  box-shadow: 0px 2px 2px -2px #ffffff33 inset, 0px 0px 2px 0px #ffffff33 inset,
    -2px -2px 6px 0px #ffffff33 inset;

  .vflex {
    h2,
    p {
      margin: 0;
    }
    h2 {
      font-size: 2rem;
    }
    p {
      color: #212121;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mapbox {
    width: 70vw;
    height: 70vw;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    border: 2px solid #d66d75;
  }
`;

const Select = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  .buttons {
    width: 80vw;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 32px;

    button {
      background: transparent;
      border: 0px;
      font-size: 2rem;
      border-radius: 50%;
    }
  }
`;

const Styled = { CardBox, Select };

export default Styled;
