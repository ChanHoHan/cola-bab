import React from 'react';
import Styled from './Loading.styled';

const Loading = () => {
  return (
    <Styled.LoadingBox>
      <div className="clouds">
        <div className="cloud bounce" />
      </div>
    </Styled.LoadingBox>
  );
};

export default Loading;
