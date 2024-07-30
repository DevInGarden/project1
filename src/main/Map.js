import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { endid, endname } from './RecoilAtom';
import map from './map.svg'

export default function Map() {
  const { kakao } = window;
  const [abc, setABC] = useState(null);
  const num = useRecoilValue(endid);
  const name = useRecoilValue(endname);

  const getData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setABC(data);
  };

  useEffect(() => {
    if (!num) return;
    const url = `http://10.125.121.200:8080/getLocation?id=${num}`;
    getData(url);
    console.log("abc", abc)
  }, [num]);

  useEffect(() => {
    if (!abc) return;
    const container = document.getElementById('map');
    const options = { center: new kakao.maps.LatLng(abc.latitude, abc.longitude), level: 4 };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(abc.latitude, abc.longitude);
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
  }, [abc]);

  return (
    name ? (
      <div className='w-1/4 bg-white bg-opacity-80 rounded-xl'>
        <div id="map" className="w-full h-full rounded-xl"></div>
      </div>
    ) : (
      <div className='w-1/4 bg-white bg-opacity-80 rounded-xl flex justify-center items-center font-semibold'>
        <div>도착역 출구정보&nbsp;</div>
        <img src={map} className='flex justify-center items-center w-5 h-5' />
      </div>
    )
  );
}
