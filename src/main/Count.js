import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useRecoilValue, useRecoilState } from 'recoil';
import { endname, stname, stid, endid, arrt } from './RecoilAtom'

export default function Time() {

  const [stnum1, setStNum1] = useState();
  const [stnum2, setStNum2] = useState();
  const [time, setTime] = useState(new Date());
  const startSt = useRef();
  const endSt = useRef();
  const first = useRecoilValue(stname);
  const end = useRecoilValue(endname);
  const firstnum = useRecoilValue(stid);
  const endnum = useRecoilValue(endid);
  const [ststationname, setStStationName] = useRecoilState(stname);
  const [endstationname, setEndStationName] = useRecoilState(endname);
  const [stdata, setStData] = useState();
  const [stcol, setStCol] = useState();
  const [firsttime, setFirstTime] = useRecoilState(arrt);

  const getData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setStData(data);
  };

  useEffect(() => {
    let st1;
    if (firstnum >= 95 && firstnum <= 134)
      st1 = 1
    else if (firstnum >= 201 && firstnum <= 243)
      st1 = 2
    else if (firstnum >= 301 && firstnum <= 317)
      st1 = 3
    else if (firstnum >= 401 && firstnum <= 414)
      st1 = 4
    setStNum1(st1)
    console.log(st1)
  }, [first])

  useEffect(() => {
    let st2;
    if (endnum >= 95 && endnum <= 134)
      st2 = 1
    else if (endnum >= 201 && endnum <= 243)
      st2 = 2
    else if (endnum >= 301 && endnum <= 317)
      st2 = 3
    else if (endnum >= 401 && endnum <= 414)
      st2 = 4
    setStNum2(st2)

    const url = `http://10.125.121.200:8080/getArrivalInfo?sid=${firstnum}&eid=${endnum}`;
    getData(url);
  }, [end])

  useEffect(() => {
    let col;
    if (stid >= 95 && stid <= 134)
      col = 'bg-orange-500'
    else if (stid >= 201 && stid <= 243)
      col = 'bg-green-500'
    else if (stid >= 301 && stid <= 317)
      col = 'bg-yellow-700'
    else if (stid >= 401 && stid <= 414)
      col = 'bg-blue-500'
    setStCol(col)
  }, [stdata])

  const getColorClass = (stid) => {
    if (stid >= 95 && stid <= 134) {
      return 'bg-orange-500';
    } else if (stid >= 201 && stid <= 243) {
      return 'bg-green-500';
    } else if (stid >= 301 && stid <= 317) {
      return 'bg-yellow-600';
    } else if (stid >= 401 && stid <= 414) {
      return 'bg-blue-500';
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('. ');
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  }

  const formatTime = (timeString) => {
    const [hour, minute, second] = timeString.split(':');
    return `${hour}:${minute}`;
  }

  const totalTime = (numtime) => {
    if (numtime >= 60) {
      const hours = Math.floor(numtime / 60);
      const minutes = numtime % 60;
      if (minutes === 0) {
        return `${hours}시간`;
      } else {
        return `${hours}시간 ${minutes}분`;
      }
    } else {
      return `${numtime}분`;
    }
  }

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => { clearInterval(t); };
  }, []);

  const formattedDate = time.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString();

  const handlereset = () => {
    setStStationName("")
    setEndStationName("")
  }

  const at = first && end && stdata && stdata.infoList ? formatTime(stdata.infoList[0].arrivalTime) : "";
  setFirstTime(at);

  return (
    <div className='bg-white bg-opacity-80 w-1/4 h-full rounded-xl flex flex-col justify-start'>
      <div className='text-center'>
        <div className="text-black font-bold mt-5 text-xl">{formatDate(formattedDate)}</div>
        <div className="text-black font-bold text-lg">{formattedTime}</div>
      </div>
      <div className='p-5'>
        <div className='flex flex-col mt-4 text-center justify-center items-center'>
          <label className="text-lg font-semibold text-gray-900">출발역</label>
          <div className='flex items-center'>
            {first && <img src={`./num/${stnum1}.svg`} alt='호선' className='w-8 mr-3' />}
            <input
              type="text"
              className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-40 font-semibold"
              placeholder="역선택"
              ref={startSt}
              value={first}
            />
          </div>
        </div>
        <div className='flex flex-col mt-4 text-center justify-center items-center'>
          <label className="text-lg font-semibold text-gray-900">도착역</label>
          <div className='flex items-center'>
            {end && <img src={`./num/${stnum2}.svg`} alt='호선' className='w-8 mr-3' />}
            <input
              type="text"
              className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-40 font-semibold"
              placeholder="역선택"
              ref={endSt}
              value={end}
            />
          </div>
        </div>
      </div>
      {first && end && stdata && stdata.infoList && (
        <div className='mt-8'>
          {stdata.infoList.length === 2 && (
            <>
              <div className='relative flex justify-center items-center mt-6 font-semibold'>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '28%' }}
                  value={first}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[0].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '58.5%' }}
                  value={end}
                />
              </div>
              <div className='flex justify-center items-center mt-6 font-semibold'>
                <div>{formatTime(stdata.infoList[0].arrivalTime)} - {formatTime(stdata.infoList[1].arrivalTime)}</div>
              </div>
            </>
          )}
          {stdata.infoList.length === 4 && (
            <>
              <div className='relative flex justify-center items-center mt-6 font-semibold'>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '17%' }}
                  value={first}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[0].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '43.5%' }}
                  value={stdata.infoList[1].stationName}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[2].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '70%' }}
                  value={end}
                />
              </div>
              <div className='flex justify-center items-center mt-6 font-semibold'>
                <div>{formatTime(stdata.infoList[0].arrivalTime)} - {formatTime(stdata.infoList[1].arrivalTime)}</div>
                <div className='mx-5'></div>
                <div>{formatTime(stdata.infoList[2].arrivalTime)} - {formatTime(stdata.infoList[3].arrivalTime)}</div>
              </div>
            </>
          )}
          {stdata.infoList.length === 6 && (
            <>
              <div className='relative flex justify-center items-center mt-6 font-semibold'>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '4%' }}
                  value={first}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[0].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '30%' }}
                  value={stdata.infoList[1].stationName}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[2].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '56%' }}
                  value={stdata.infoList[3].stationName}
                />
                <div className={`flex justify-center items-center w-28 h-5 relative z-10 text-white text-sm ${getColorClass(stdata.infoList[4].stationId)}`}>
                </div>
                <input
                  className='absolute z-20 w-14 h-14 flex justify-center items-center text-sm text-center rounded-full bg-slate-200 text-black'
                  style={{ left: '82%' }}
                  value={end}
                />
              </div>
              <div className='flex justify-center items-center mt-6 font-semibold'>
                <div>{formatTime(stdata.infoList[0].arrivalTime)} - {formatTime(stdata.infoList[1].arrivalTime)}</div>
                <div className='mx-3'></div>
                <div>{formatTime(stdata.infoList[2].arrivalTime)} - {formatTime(stdata.infoList[3].arrivalTime)}</div>
                <div className='mx-3'></div>
                <div>{formatTime(stdata.infoList[4].arrivalTime)} - {formatTime(stdata.infoList[5].arrivalTime)}</div>
              </div>
            </>
          )}
          <div className='flex flex-col justify-center items-center text-center mt-4 font-semibold'>
            <div>소요시간</div>
            <div>{totalTime(stdata.totalTime)}</div>
          </div>
          <div className='flex justify-center items-center'>
            <button
              type='button'
              className='px-5 py-2.5 bg-slate-200 text-black font-semibold rounded-xl mt-4'
              onClick={handlereset}>
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
