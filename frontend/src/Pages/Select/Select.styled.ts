import styled from 'styled-components';
import TinderCard from 'react-tinder-card';

const CardBox = styled(TinderCard)<{ bgcolor: string }>`
  position: absolute;
  width: 80vw;
  height: 80vh;
  border-radius: 30px;

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
    p {
      color: #212121;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mapbox {
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50%;
  }
`;

const Select = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Styled = { CardBox, Select };

export default Styled;
