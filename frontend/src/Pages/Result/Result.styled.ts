import styled from 'styled-components';

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 80vh;

  .charts {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .chartbox {
      display: flex;
      justify-content: stretch;
      flex-direction: row;
      width: 100%;
      height: 20px;
      border-radius: 15px;
      overflow: hidden;
      background: white;
      gap: 0;
      span {
        flex-grow: 1;
        transition: all 0.5s;
      }
      span:nth-child(1) {
        background: #277da1;
      }
      span:nth-child(2) {
        background: #90be6d;
      }
      span:nth-child(3) {
        background: #f3722c;
      }
      span:nth-child(4) {
        background: #f94144;
      }
    }
  }
  .buttons {
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

const Styled = { ResultBox };
export default Styled;
