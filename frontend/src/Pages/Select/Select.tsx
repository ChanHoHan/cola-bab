import React, { useState, useEffect, useContext } from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { useTheme } from '@mui/material';
import Styled from './Select.styled';
import { MapContext } from 'App';

// @ts-ignore
const { kakao } = window;

const Select = () => {
  const [list, setList] = useState([]);
  const { map } = useContext(MapContext);
  const theme = useTheme();
  const [lastDirection, setLastDirection] = useState<string>('');

  const swiped = (direction: string, nameToDelete: string) => {
    // setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  useEffect(() => {
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

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      <Styled.Select>
        {list.map((element, index) => {
          const category = element.category_name.split(' > ');
          return (
            <Styled.CardBox
              className="swipe"
              bgcolor={theme.myPalette.backgroundCard}
              key={element.id}
              onSwipe={(dir) => swiped(dir, element.id)}
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
                    width: '300px',
                    height: '300px',
                  }}
                />
              </div>
              <span>나랑 거리</span>
            </Styled.CardBox>
          );
        })}
        <span>버튼 네개!</span>
      </Styled.Select>
    </GlobalStyled.ThemeBox>
  );
};

export default Select;
