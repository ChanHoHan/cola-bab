import React from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { useTheme } from '@mui/material';
import Styled from './Result.styled';

const results = [
  [
    {
      name: 'hi',
      result: 0,
    },
    {
      name: 'hi',
      result: 2,
    },
    {
      name: 'hi',
      result: 2,
    },
    {
      name: 'hi',
      result: 3,
    },
  ],
  [
    {
      name: 'hi',
      result: 3,
    },
    {
      name: 'hi',
      result: 1,
    },
    {
      name: 'hi',
      result: 2,
    },
    {
      name: 'hi',
      result: 0,
    },
  ],
];

const Result = () => {
  const theme = useTheme();

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <Styled.ResultBox>
        <h1>결과</h1>

        <div className="charts">
          {results.map((list, index) => {
            return (
              <div className="chartbox" key={index}>
                <span
                  style={{
                    flexGrow: list.filter((element) => element.result === 0)
                      .length,
                  }}
                />
                <span
                  style={{
                    flexGrow: list.filter((element) => element.result === 1)
                      .length,
                  }}
                />
                <span
                  style={{
                    flexGrow: list.filter((element) => element.result === 2)
                      .length,
                  }}
                />
                <span
                  style={{
                    flexGrow: list.filter((element) => element.result === 3)
                      .length,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button>그룹에 참여하기</button>
          <div>
            <span>
              <button>a</button>
              <p>결과 공유</p>
            </span>
            <span>
              <button>a</button>
              <p>친구 초대</p>
            </span>
            <span>
              <button>a</button>
              <p>그룹 생성</p>
            </span>
          </div>
        </div>
        <span>@Team ChanSu</span>
      </Styled.ResultBox>
    </GlobalStyled.ThemeBox>
  );
};

export default Result;
