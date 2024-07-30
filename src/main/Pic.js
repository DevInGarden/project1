import sub from './SUB1.svg'
import { useState, useEffect } from 'react';
import ImageMapper from 'react-img-mapper';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { stname, endname, stid, endid } from './RecoilAtom'

Modal.setAppElement('#root');

function ImageMapExample() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [newarea, setNewarea] = useState();
    const [ststationname, setStStationName] = useRecoilState(stname);
    const [endstationname, setEndStationName] = useRecoilState(endname);
    const [ststationid, setStStationId] = useRecoilState(stid);
    const [endstationid, setEndStationId] = useRecoilState(endid);

    const STATIONS = [
        {
            name: 'station1',
            areas: [
                { id: '다대포해수욕장', shape: 'circle', coords: [27.3716, 88.9844, 8], stid: 95, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '다대포항', shape: 'circle', coords: [54.7365, 88.9844, 8], stid: 96, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '낫개', shape: 'circle', coords: [82.1013, 88.9844, 8], stid: 97, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '신장림', shape: 'circle', coords: [109.466, 88.9844, 8], stid: 98, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '장림', shape: 'circle', coords: [136.831, 88.9844, 8], stid: 99, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동매', shape: 'circle', coords: [164.196, 88.9844, 8], stid: 100, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '신평', shape: 'circle', coords: [191.561, 88.9844, 8], stid: 101, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '하단', shape: 'circle', coords: [218.926, 88.9844, 8], stid: 102, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '당리', shape: 'circle', coords: [244.504, 93, 8], stid: 103, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '사하', shape: 'circle', coords: [246.291, 118.699, 8], stid: 104, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '괴정', shape: 'circle', coords: [246.291, 148.415, 8], stid: 105, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '대티', shape: 'circle', coords: [246.291, 178.13, 8], stid: 106, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '서대신', shape: 'circle', coords: [246.291, 207.845, 8], stid: 107, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동대신', shape: 'circle', coords: [246.291, 237.56, 8], stid: 108, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '토성', shape: 'circle', coords: [246.291, 267.275, 8], stid: 109, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '자갈치', shape: 'circle', coords: [248.504, 294, 8], stid: 110, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '남포', shape: 'circle', coords: [277.203, 297.531, 8], stid: 111, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '중앙', shape: 'circle', coords: [307.101, 297.531, 8], stid: 112, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부산', shape: 'circle', coords: [335.987, 297.531, 8], stid: 113, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '초량', shape: 'circle', coords: [365.885, 297.531, 8], stid: 114, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부산진', shape: 'circle', coords: [396.291, 297.531, 8], stid: 115, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '좌천', shape: 'circle', coords: [426.696, 297.531, 8], stid: 116, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '범일', shape: 'circle', coords: [457.101, 297.531, 8], stid: 117, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '범내골', shape: 'circle', coords: [487.507, 297.531, 8], stid: 118, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '서면', shape: 'circle', coords: [518.419, 297.531, 8], stid: 119, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부전', shape: 'circle', coords: [556.426, 297.531, 8], stid: 120, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '양정', shape: 'circle', coords: [594.433, 297.531, 8], stid: 121, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '시청', shape: 'circle', coords: [632.439, 297.531, 8], stid: 122, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '연산', shape: 'circle', coords: [671.46, 298.071, 8], stid: 123, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '교대', shape: 'circle', coords: [731.764, 297.531, 8], stid: 124, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동래', shape: 'circle', coords: [793.588, 298.071, 8], stid: 125, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '명륜', shape: 'circle', coords: [827.541, 297.531, 8], stid: 126, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '온천장', shape: 'circle', coords: [868.081, 297.531, 8], stid: 127, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부산대', shape: 'circle', coords: [908.622, 297.531, 8], stid: 128, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '장전', shape: 'circle', coords: [949.162, 297.531, 8], stid: 129, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '구서', shape: 'circle', coords: [990.21, 297.531, 8], stid: 130, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '두실', shape: 'circle', coords: [1031.26, 297.531, 8], stid: 131, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '남산', shape: 'circle', coords: [1072.2, 297.531, 8], stid: 132, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '범어사', shape: 'circle', coords: [1113.35, 297.531, 8], stid: 133, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '노포', shape: 'circle', coords: [1154.4, 297.531, 8], stid: 134, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 }
            ]
        },
        {
            name: 'station2',
            areas: [
                { id: '양산', shape: 'circle', coords: [1149.33, 135.448, 8], stid: 243, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '남양산', shape: 'circle', coords: [1112.84, 135.448, 8], stid: 242, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부산대양산캠퍼스', shape: 'circle', coords: [1076.36, 135.448, 8], station: '2', stid: 241, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '증산', shape: 'circle', coords: [1039.87, 135.448, 8], stid: 240, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '호포', shape: 'circle', coords: [1003.39, 135.448, 8], stid: 239, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '금곡', shape: 'circle', coords: [966.899, 135.448, 8], stid: 238, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동원', shape: 'circle', coords: [930.412, 135.448, 8], stid: 237, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '율리', shape: 'circle', coords: [895.446, 135.448, 8], stid: 236, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '화명', shape: 'circle', coords: [859.466, 135.448, 8], stid: 235, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '수정', shape: 'circle', coords: [825.007, 135.448, 8], stid: 234, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '덕천', shape: 'circle', coords: [793.588, 134.908, 8], stid: 233, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '구명', shape: 'circle', coords: [769.77, 135.448, 8], stid: 232, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '구남', shape: 'circle', coords: [738.352, 135.448, 8], stid: 231, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '모라', shape: 'circle', coords: [706.933, 135.448, 8], stid: 230, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '모덕', shape: 'circle', coords: [675.514, 135.448, 8], stid: 229, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '덕포', shape: 'circle', coords: [644.095, 135.448, 8], stid: 228, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '사상', shape: 'circle', coords: [612.676, 135.448, 8], stid: 227, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '감전', shape: 'circle', coords: [581.257, 135.448, 8], stid: 226, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '주례', shape: 'circle', coords: [549.838, 135.448, 8], stid: 225, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '냉정', shape: 'circle', coords: [522.504, 138, 8], stid: 224, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '개금', shape: 'circle', coords: [518.419, 167.324, 8], stid: 223, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동의대', shape: 'circle', coords: [518.419, 199.2, 8], stid: 222, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '가야', shape: 'circle', coords: [518.419, 231.077, 8], stid: 221, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '부암', shape: 'circle', coords: [518.419, 262.953, 8], stid: 220, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '서면', shape: 'circle', coords: [518.419, 297.531, 8], stid: 219, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '전포', shape: 'circle', coords: [518.419, 328.326, 8], stid: 218, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '국제금융센터부산은행', shape: 'circle', coords: [518.419, 361.823, 8], stid: 217, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '문현', shape: 'circle', coords: [518.419, 395.32, 8], stid: 216, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '지게골', shape: 'circle', coords: [518.419, 428.817, 8], stid: 215, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '못골', shape: 'circle', coords: [517.912, 462.314, 8], stid: 214, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '대연', shape: 'circle', coords: [521.504, 492, 8], stid: 213, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '경성대부경대', shape: 'circle', coords: [550.345, 495.271, 8], stid: 212, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '남천', shape: 'circle', coords: [582.27, 495.271, 8], stid: 211, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '금련산', shape: 'circle', coords: [614.196, 495.271, 8], stid: 210, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '광안', shape: 'circle', coords: [646.122, 495.271, 8], stid: 209, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '수영', shape: 'circle', coords: [670.953, 495.271, 8], stid: 208, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '민락', shape: 'circle', coords: [703.892, 495.271, 8], stid: 207, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '센텀시티', shape: 'circle', coords: [741.392, 495.271, 8], stid: 206, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '벡스코', shape: 'circle', coords: [779.906, 495.271, 8], stid: 205, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동백', shape: 'circle', coords: [817.406, 495.271, 8], stid: 204, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '해운대', shape: 'circle', coords: [855.979, 495.271, 8], stid: 203, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '중동', shape: 'circle', coords: [894.433, 495.271, 8], stid: 202, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '장산', shape: 'circle', coords: [932.946, 495.271, 8], stid: 201, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 }
            ]
        },
        {
            name: 'station3',
            areas: [
                { id: '대저', shape: 'circle', coords: [793.588, 27.3931, 8], stid: 317, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '체육공원', shape: 'circle', coords: [793.588, 53.8665, 8], stid: 316, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '강서구청', shape: 'circle', coords: [793.588, 80.3398, 8], stid: 315, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '구포', shape: 'circle', coords: [793.588, 107.354, 8], stid: 314, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '덕천', shape: 'circle', coords: [793.588, 134.908, 8], stid: 313, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '숙등', shape: 'circle', coords: [793.588, 161.921, 8], stid: 312, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '남산정', shape: 'circle', coords: [793.588, 188.395, 8], stid: 311, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '만덕', shape: 'circle', coords: [793.588, 214.868, 8], stid: 310, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '미남', shape: 'circle', coords: [793.588, 247.285, 8], stid: 309, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '사직', shape: 'circle', coords: [755.581, 247.285, 8], stid: 308, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '종합운동장', shape: 'circle', coords: [714.027, 246.745, 8], stid: 307, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '거제', shape: 'circle', coords: [674.504, 249, 8], stid: 306, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '연산', shape: 'circle', coords: [671.46, 298.071, 8], stid: 305, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '물만골', shape: 'circle', coords: [671.46, 347.236, 8], stid: 304, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '배산', shape: 'circle', coords: [671.46, 396.401, 8], stid: 303, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '망미', shape: 'circle', coords: [671.46, 445.566, 8], stid: 302, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '수영', shape: 'circle', coords: [670.953, 495.271, 8], stid: 301, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 }
            ]
        },
        {
            name: 'station4',
            areas: [
                { id: '미남', shape: 'circle', coords: [793.588, 247.285, 8], stid: 401, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '동래', shape: 'circle', coords: [793.588, 298.071, 8], stid: 402, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '수안', shape: 'circle', coords: [793.588, 328.326, 8], stid: 403, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '낙민', shape: 'circle', coords: [793.588, 361.823, 8], stid: 404, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '충렬사', shape: 'circle', coords: [796.504, 394, 8], stid: 405, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '명장', shape: 'circle', coords: [830.581, 397.481, 8], stid: 406, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '서동', shape: 'circle', coords: [867.575, 397.481, 8], stid: 407, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '금사', shape: 'circle', coords: [904.568, 397.481, 8], stid: 408, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '반여농산물시장', shape: 'circle', coords: [941.561, 397.481, 8], stid: 409, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '석대', shape: 'circle', coords: [978.554, 397.481, 8], stid: 410, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '영산대', shape: 'circle', coords: [1015.55, 397.481, 8], stid: 411, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '윗반송', shape: 'circle', coords: [1052.54, 397.481, 8], stid: 412, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '고촌', shape: 'circle', coords: [1089.53, 397.481, 8], stid: 413, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 },
                { id: '안평', shape: 'circle', coords: [1126.53, 397.481, 8], stid: 414, strokeColor: 'rgba(0, 0, 0, 0)', strokeWidth: 0 }
            ]
        }
    ];

    const MAP = {
        name: 'subway-map',
        areas: [...STATIONS[0].areas, ...STATIONS[1].areas, ...STATIONS[2].areas, ...STATIONS[3].areas]
    };

    const handleClick = (area) => {
        if (area.id === "서면") {
            setModalPosition({ top: 297.531, left: 578.419 });
        } else if (area.id === "수영") {
            setModalPosition({ top: 495.271, left: 731.46 });
        } else if (area.id === "연산") {
            setModalPosition({ top: 298.071, left: 731.46 });
        } else if (area.id === "동래") {
            setModalPosition({ top: 298.071, left: 853.588 });
        } else if (area.id === "미남") {
            setModalPosition({ top: 247.285, left: 853.588 });
        } else if (area.id === "덕천") {
            setModalPosition({ top: 134.908, left: 853.588 });
        }

        if (['서면', '수영', '연산', '동래', '미남', '덕천'].includes(area.id))
            setIsModalOpen(true);
        setNewarea(area);
    };

    useEffect(() => {
        if (!newarea) return;
        if (['서면', '수영', '연산', '동래', '미남', '덕천'].includes(newarea.id)) return;
        if (!ststationname) {
            setStStationName(newarea.id)
            setStStationId(newarea.stid)
        } else if (ststationname && endstationname) {
            alert("출발역과 도착역이 모두 선택됐습니다.  다시 선택하세요.")
            setStStationName("")
            setEndStationName("")
        } else {
            setEndStationName(newarea.id)
            setEndStationId(newarea.stid)
        }
    }, [newarea])

    const handleSelection = (station) => {
        const selectedStation = STATIONS.find(s => s.name === station);
        const selectedAreaDetails = selectedStation.areas.find(a => a.id === newarea.id);
        if (!ststationname) {
            setStStationId(selectedAreaDetails.stid)
            setStStationName(selectedAreaDetails.id)
        } else if (endstationname && ststationname) {
            alert("출발역과 도착역이 모두 선택됐습니다. 다시 선택하세요.")
            setStStationName("")
            setEndStationName("")
        } else if (!endstationname && ststationname != newarea.id) {
            setEndStationId(selectedAreaDetails.stid)
            setEndStationName(selectedAreaDetails.id)
        }
        setIsModalOpen(false);
    };

    return (
        <div className='bg-white bg-opacity-80 h-full w-3/4 rounded-xl flex justify-center items-center relative'>
            <ImageMapper
                src={sub}
                map={MAP}
                width={1181}
                height={522}
                onClick={handleClick}
            />

            {isModalOpen && (
                <div
                    className="absolute bg-white border border-gray-300 p-2 rounded-lg z-10"
                    style={{
                        top: modalPosition.top,
                        left: modalPosition.left,
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        border: 0
                    }}
                >
                    <div className='flex'>
                        {(newarea.id === '서면' || newarea.id === '연산' || newarea.id === '동래') ? <button
                            type="button"
                            className="px-2.5 py-2.5 w-14 text-xs text-white bg-orange-400 rounded-xl mr-2 font-semibold"
                            onClick={() => handleSelection('station1')}>
                            1호선
                        </button> : ''}
                        {(newarea.id === '수영' || newarea.id === '서면' || newarea.id === '덕천') ? <button
                            type="button"
                            className="px-2.5 py-2.5 w-14 text-xs text-white bg-green-400 rounded-xl mr-2 font-semibold"
                            onClick={() => handleSelection('station2')}>
                            2호선
                        </button> : ''}
                        {(newarea.id === '수영' || newarea.id === '연산' || newarea.id === '미남' || newarea.id === '덕천') ? <button
                            type="button"
                            className="px-2.5 py-2.5 w-14 text-xs text-white bg-yellow-700 rounded-xl mr-2 font-semibold"
                            onClick={() => handleSelection('station3')}>
                            3호선
                        </button> : ''}
                        {(newarea.id === '미남' || newarea.id === '동래') ? <button
                            type="button"
                            className="px-2.5 py-2.5 w-14 text-xs text-white bg-blue-400 rounded-xl mr-2 font-semibold"
                            onClick={() => handleSelection('station4')}>
                            4호선
                        </button> : ''}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageMapExample;