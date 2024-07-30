import React, { useState, useEffect } from 'react';
import { FaSadCry, FaMeh, FaSmile } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { stname, stid, endname } from './RecoilAtom';
import mask from './mask.svg';

const Air = () => {
    const [time, setTime] = useState(new Date());
    const fname = useRecoilValue(stname);
    const ename = useRecoilValue(endname);
    const num = useRecoilValue(stid);
    const [airdata, setAirData] = useState(null);
    const [locnum, setLocNum] = useState(null);

    const [bgColor1, setBgColor1] = useState('text-gray-400');
    const [bgColor2, setBgColor2] = useState('text-gray-400');
    const [text1, setText1] = useState('-');
    const [text2, setText2] = useState('-');
    const [icon1, setIcon1] = useState('-');
    const [icon2, setIcon2] = useState('-');

    const hour = time.getHours();
    const formattedHour = hour <= 10 ? '0' + (hour - 1) : (hour === 12 ? '11' : hour - 1);
    const formattedDate = time.toLocaleDateString();

    const formatNum = (dateString) => {
        const [year, month, day] = dateString.replace(".", "").split(" ");
        let formattedMonth = parseInt(month);
        let formattedDay = parseInt(day);
        if (formattedMonth < 10) {
            formattedMonth = '0' + formattedMonth;
        }
        if (formattedDay < 10) {
            formattedDay = '0' + formattedDay;
        }
        return `${year}${formattedMonth}${formattedDay}`;
    };

    useEffect(() => {
        if (!num) return;
        let loc;
        if (num === 119) {
            loc = 201193;
        } else if (num === 219) {
            loc = 202192;
        } else if (num === 227) {
            loc = 202271;
        } else if (num === 208 || num === 301) {
            loc = 203011;
        } else if (num === 305 || num === 123) {
            loc = 203051;
        } else if (num === 401 || num === 309) {
            loc = 203091;
        } else if (num === 313 || num === 233) {
            loc = 203131;
        } else if (num === 125 || num === 402) {
            loc = 204021;
        } else if (num === 111) {
            loc = 201111;
        } else {
            loc = 1;
        }
        setLocNum(loc);
    }, [num]);

    useEffect(() => {
        if (!locnum) return;
        if (locnum === 1) {
            setAirData(null);
            return;
        }

        setTime(new Date());
        let url = `https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation`;
        url = `${url}?serviceKey=${process.env.REACT_APP_APIKEY}`;
        url = `${url}&resultType=json&controlnumber=${formatNum(formattedDate)}${formattedHour}`;
        url = `${url}&areaIndex=${locnum}`;

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setAirData(data.getIndoorAirQualityByStation.body.items.item[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [locnum]);

    useEffect(() => {
        if (!airdata) {
            setBgColor1('text-gray-400');
            setText1('-');
            setIcon1('-');
            setBgColor2('text-gray-400');
            setText2('-');
            setIcon2('-');
            return;
        }

        if (airdata.pm25 >= 1 && airdata.pm25 <= 15) {
            setBgColor1('text-blue-400');
            setText1('좋음');
            setIcon1(<FaSmile className="text-blue-400" />);
        } else if (airdata.pm25 >= 16 && airdata.pm25 <= 35) {
            setBgColor1('text-green-500');
            setText1('보통');
            setIcon1(<FaMeh className="text-green-500" />);
        } else if (airdata.pm25 >= 36) {
            setBgColor1('text-red-500');
            setText1('나쁨');
            setIcon1(<FaSadCry className="text-red-500" />);
        }

        if (airdata.co2 >= 350 && airdata.co2 <= 450) {
            setBgColor2('text-blue-400');
            setText2('좋음');
            setIcon2(<FaSmile className="text-blue-400" />);
        } else if (airdata.co2 >= 451) {
            setBgColor2('text-green-500');
            setText2('보통');
            setIcon2(<FaMeh className="text-green-500" />);
        } else if (airdata.co2 > 800) {
            setBgColor2('text-red-500');
            setText2('나쁨');
            setIcon2(<FaSadCry className="text-red-500" />);
        }
    }, [airdata]);

    return (
        ename ? (
            <div className='bg-white bg-opacity-80 flex flex-col w-1/6 rounded-xl items-center justify-center'>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='text-black text-xl font-extrabold'>
                        {fname}역
                    </div>
                    <div className='mb-3 mt-2 font-semibold'>
                        <div className='text-black text-center mt-3 text-xs'>
                            <span className='text-black text-sm'>초미세먼지(PM2.5)</span>
                        </div>
                        <div className={`${bgColor1} text-lg flex justify-center items-center`}>
                            {airdata && airdata.pm25 ? `${airdata.pm25}µg/m³` : '측정 기계 없음'}
                            <span className='font-normal text-black'>/</span>{text1}
                            {icon1 && icon1 !== '-' && <span className="ml-1">{icon1}</span>}
                        </div>
                    </div>
                    <div className='font-semibold mt-3'>
                        <div className='text-black text-center text-sm'>
                            <span className='text-black'>이산화탄소(CO2)</span>
                        </div>
                        <div className={`${bgColor2} text-lg flex justify-center items-center`}>
                            {airdata && airdata.co2 ? `${airdata.co2}ppm` : '측정 기계 없음'}
                            <span className='text-black font-normal'>/</span>{text2}
                            {icon2 && icon2 !== '-' && <span className="ml-1">{icon2}</span>}
                        </div>
                    </div>
                    <div className='w-full text-xs text-right mr-8 mt-4'>1시간 평균값</div>
                </div>
            </div>
        ) : (
            <div className='bg-white bg-opacity-80 flex w-1/6 rounded-xl items-center justify-center font-semibold'>
                <div>출발역 공기질 정보&nbsp;</div>
                <img src={mask} className='flex justify-center items-center w-5 h-5' />
            </div>
        )
    );
};

export default Air;
