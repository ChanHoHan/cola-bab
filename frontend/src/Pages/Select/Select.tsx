import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { Button, useTheme } from '@mui/material';
import Styled from './Select.styled';
import { MapContext } from 'App';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

// @ts-ignore
const { kakao } = window;

const Select = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
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
    if (val === 0) setIsDone(true);
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
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      const mapContainer = document.getElementById(`myMap${index}`),
        mapOption = {
          center: new kakao.maps.LatLng(loc.y, loc.x),
          level: 3,
          marker: marker,
        };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      map.setDraggable(false);
      marker.setMap(map);
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
        <button className={isDone ? 'result' : 'testing'}>결과보기</button>
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
          <button onClick={() => handleButtonTabbed('left')}>
            <StarBorderRoundedIcon sx={{ color: 'white' }} />
          </button>
          <button onClick={() => handleButtonTabbed('up')}>
            <CircleOutlinedIcon sx={{ color: 'white' }} />
          </button>
          <button onClick={() => handleButtonTabbed('right')}>
            <ChangeHistoryRoundedIcon sx={{ color: 'white' }} />
          </button>
          <button onClick={() => handleButtonTabbed('down')}>
            <CloseRoundedIcon sx={{ color: 'white' }} />
          </button>
        </div>
      </Styled.Select>
    </GlobalStyled.ThemeBox>
  );
};

export default Select;
