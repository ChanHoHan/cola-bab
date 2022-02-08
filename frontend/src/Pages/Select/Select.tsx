import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { Button, useTheme } from '@mui/material';
import Styled from './Select.styled';
import { MapContext } from 'App';

// @ts-ignore
const { kakao } = window;

const Select = () => {
  const [list, setList] = useState([]);
  const { map } = useContext(MapContext);
  const theme = useTheme();
  const [lastDirection, setLastDirection] = useState<string>('');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const canSwipe = currentIndex >= 0;

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(list.length)
        .fill(0)
        .map((i) => React.createRef()),
    [list]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  useEffect(() => {
    setCurrentIndex(list.length - 1);
    list.map((loc, index) => {
      const markerPosition = new kakao.maps.LatLng(loc.y, loc.x);
      const marker = {
        position: markerPosition,
      };

      const staticMapContainer = document.getElementById(`myMap${index}`),
        staticMapOption = {
          center: new kakao.maps.LatLng(loc.y, loc.x),
          level: 3,
          marker: marker,
        };

      const staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption
      );
      return true;
    });
  }, [list]);

  useEffect(() => {
    const ps = new kakao.maps.services.Places(map);
    // @ts-ignore
    ps.categorySearch(
      'FD6',
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setList(data);
        }
      },
      {
        useMapBounds: true,
      }
    );
  }, []);

  const handleButtonTabbed = async (dir: string) => {
    if (canSwipe && currentIndex < list.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <Styled.Select>
        {list.map((element, index) => {
          const category = element.category_name.split(' > ');
          return (
            <Styled.CardBox
              // @ts-ignore
              ref={childRefs[index]}
              className="swipe"
              bgcolor={theme.myPalette.backgroundCard}
              key={element.id}
              onSwipe={(dir) => swiped(dir, element.id, index)}
              onCardLeftScreen={() => outOfFrame(element.id)}
            >
              <div className="vflex">
                <h2>{element.place_name}</h2>
                <p>{category.length <= 2 ? category[1] : category[2]}</p>
              </div>
              <div className="mapbox">
                <div
                  id={`myMap${index}`}
                  style={{
                    width: '70vw',
                    height: '70vw',
                  }}
                />
              </div>
              <span>나랑 거리</span>
            </Styled.CardBox>
          );
        })}
        <div className="buttons">
          <button onClick={() => handleButtonTabbed('left')}>👍</button>
          <button onClick={() => handleButtonTabbed('up')}>😍</button>
          <button onClick={() => handleButtonTabbed('down')}>❌</button>
          <button onClick={() => handleButtonTabbed('right')}>👎</button>
        </div>
      </Styled.Select>
    </GlobalStyled.ThemeBox>
  );
};

export default Select;
