import React from 'react';
import line from './line.svg'
import { useRecoilValue } from 'recoil';
import { stname, stid, endname, arrt } from './RecoilAtom'
import { useEffect, useState } from 'react'
import many from './many.svg'

export default function Table() {

    const fname = useRecoilValue(stname)
    const ename = useRecoilValue(endname)
    const arr1 = useRecoilValue(arrt)
    const num = useRecoilValue(stid)
    const [ttime, setTtime] = useState([]);
    const [stnum, setStNum] = useState();

    const getData = async (url) => {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data)
        let tm = data.map(item => {
            const [hours, minutes] = item.arrivalTime.split(':');
            const formattedTime = `${hours}:${minutes}`;
            return { arrivalTime: formattedTime };
        });
        setTtime(tm);
    }

    const plus = (time) => {
        const [h, m] = time.split(":").map(Number);
        const newMinutes = m + 7;
        const newHours = h + Math.floor(newMinutes / 60);
        const remainingMinutes = newMinutes % 60;
        const formattedHours = String(newHours).padStart(2, '0');
        const formattedMinutes = String(remainingMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }

    useEffect(() => {
        let st;
        if (!num) return;
        let url = `http://10.125.121.200:8080/getArrivalTime?id=${num}`
        getData(url);
        console.log("url", url)
        if (num >= 95 && num <= 134)
            st = 8
        else if (num >= 201 && num <= 243)
            st = 6
        else if (num >= 301 && num <= 317)
            st = 4
        else if (num >= 401 && num <= 414)
            st = 6
        setStNum(st)
    }, [num])

    let num1 = [];
    while (num1.length < stnum) {
        let num = Math.floor(Math.random() * 15);
        num1.push(num);
    }

    let num2 = [];
    while (num2.length < stnum) {
        let num = Math.floor(Math.random() * 15);
        num2.push(num);
    }

    const train1 = num1.map((item, idx) => {
        let text;

        if (item >= 0 && item < 5) {
            text = '혼잡';
        } else if (item >= 5 && item < 10) {
            text = '보통';
        } else if (item >= 10) {
            text = '여유';
        }

        if (idx === stnum - 1) {
            return (
                <div key={idx} className="flex flex-col items-center font-semibold mt-4">
                    <img src={`./train/first/${text}.svg`} alt='1호차' className='w-28' />
                </div>
            );
        } else {
            return (
                <div key={idx} className="flex flex-col items-center font-semibold mt-4">
                    <img src={`./train/center/${text}.svg`} alt='2호차이상' className='w-28' />
                </div>
            );
        }
    });

    const train2 = num2.map((item, idx) => {
        let text;

        if (item >= 0 && item < 5) {
            text = '혼잡';
        } else if (item >= 5 && item < 10) {
            text = '보통';
        } else if (item >= 10) {
            text = '여유';
        }


        if (idx === stnum - 1) {
            return (
                <div key={idx} className="flex flex-col items-center font-semibold mt-4">
                    <img src={`./train/first/${text}.svg`} alt='1호차' className='w-28' />
                </div>
            );
        } else {
            return (
                <div key={idx} className="flex flex-col items-center font-semibold mt-4">
                    <img src={`./train/center/${text}.svg`} alt='2호차이상' className='w-28' />
                </div>
            );
        }
    });

    return (
        ename ? (
            <div className='bg-white bg-opacity-80 w-7/12 pt-4 pl-4 rounded-xl flex'>
                <div className='flex justify-between flex-col w-5/6'>
                    <div className='font-extrabold'>
                        <div>{fname}역 이번 열차</div>
                        <div className="flex items-center h-10">
                            {train1}
                        </div>
                    </div>
                    <div className='font-extrabold'>
                        <div>{fname}역 다음 열차</div>
                        <div className="flex items-center h-10">
                            {train2}
                        </div>
                    </div>
                    <div className='mb-3 ml-3'>
                        <img src={line} className='w-60' alt="Line" />
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center text-center w-1/6'>
                    <div className='font-extrabold mr-2'>도착시간</div>
                    <div className='h-10 flex justify-center text-2xl font-semibold mt-4'>
                        {/* {ttime.length > 0 && ttime[0]?.arrivalTime && fname && ename ? ttime[0].arrivalTime : ''} */}
                        {arr1}
                    </div>
                    <div className='h-10 flex justify-center text-2xl font-semibold mt-12'>
                        {/* {ttime.length > 1 && ttime[1]?.arrivalTime && fname && ename ? plus(ttime[0].arrivalTime) : ''} */}
                        {plus(arr1)}
                    </div>
                </div>
            </div>
        ) : (
            <div className='bg-white bg-opacity-80 w-7/12 pt-4 pl-4 rounded-xl flex justify-center items-center font-semibold'>
                <div>출발역 혼잡도 정보&nbsp;</div>
                <img src={many} className='flex justify-center items-center w-5 h-5' alt="Congestion" />
            </div>
        )
    );

}
