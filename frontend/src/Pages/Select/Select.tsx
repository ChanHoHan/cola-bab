import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import GlobalStyled from 'Components/GlobalStyled.styled';
import { Button, useTheme } from '@mui/material';
import Styled from './Select.styled';
import { MapContext } from 'App';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from 'Components/Loading';

// @ts-ignore
const { kakao } = window;

const Select = () => {
  const navi = useNavigate();
  const location = useLocation();
  const [isDone, setIsDone] = useState<boolean>(false);
  const [searchRadius, setSearchRadius] = useState<number>(500);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isFetchList, setIsFetchList] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
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
        .map((_) => React.createRef()),
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
          level: 2,
          marker: marker,
        };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      map.setDraggable(false);
      marker.setMap(map);
      return true;
    });
    setIsLoaded(true);
  }, [list]);

  useEffect(() => {
    if (!isFetchList) return;
    if (list1.length !== 0 && list2.length !== 0 && list3.length !== 0) {
      const newList = [...list1, ...list2, ...list3]
        .sort(() => Math.random() - 0.5)
        .slice(0, 15);
      setList(newList);
    } else {
      setSearchRadius((prevState) => prevState + 500);
      setIsCalculating(false);
    }
  }, [list1, list2, list3, isFetchList]);

  useEffect(() => {
    const categorySearch = async (
      ps: any,
      page: number,
      setEachList: (value: React.SetStateAction<any[]>) => void
    ) => {
      const options = {
        location: map.getCenter(),
        useMapBounds: false,
        radius: searchRadius,
        sortby: 'DISTANCE',
      };
      await ps.categorySearch(
        'FD6',
        (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            setEachList(data);
          }
        },
        { ...options, page: page }
      );
    };
    if (map && !isCalculating) {
      setIsCalculating(true);
      const ps = new kakao.maps.services.Places(map);
      // @ts-ignore
      console.log(map.getCenter());
      categorySearch(ps, 1, setList1);
      categorySearch(ps, 2, setList2);
      categorySearch(ps, 3, setList3);
      setIsFetchList(true);
    } else {
      console.log('No Result');
    }
  }, [searchRadius, map, isCalculating]);

  const handleButtonTabbed = async (dir: string) => {
    if (canSwipe && currentIndex < list.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir);
    }
  };
  const handleResultButtonTabbed = () => {
    console.log(`${location}/result`);
    navi(`${location}/result`);
  };

  return (
    <GlobalStyled.ThemeBox bgcolor={theme.myPalette.background}>
      {!isLoaded && <Loading />}
      <GlobalStyled.Cloud bgcolor={theme.myPalette.cloud}>
        <div className="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
        </div>
      </GlobalStyled.Cloud>
      <Styled.Select>
        <button
          className={isDone ? 'result' : 'testing'}
          onClick={handleResultButtonTabbed}
        >
          결과보기
        </button>
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
            <CircleOutlinedIcon sx={{ color: 'white' }} />
          </button>
          <button onClick={() => handleButtonTabbed('up')}>
            <StarBorderRoundedIcon sx={{ color: 'white' }} />
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
