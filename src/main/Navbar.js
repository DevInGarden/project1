import React, { useEffect } from 'react';
import { FaTrainSubway } from "react-icons/fa6";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { inout } from './RecoilAtom';

const Navbar = () => {
    const navigate = useNavigate();
    const log = useRecoilValue(inout);
    const [logout, setLogout] = useRecoilState(inout);
    const email = localStorage.getItem('email');
    const username = email ? email.split('@')[0] : '';

    useEffect(() => {
        if (!email)
            setLogout('Login / Join');
        else
            setLogout("Logout")
    }, [])

    const handleLoginClick = () => {
        if (log === 'Login / Join') {
            navigate('/login');
        } else if (log === 'Logout') {
            localStorage.clear();
            setLogout('Login / Join');
            navigate('/main');
        }
    };

    return (
        <div className="flex justify-between">
            <div className="flex-[0.5] flex items-center space-x-2 ml-2 text-black font-semibold cursor-pointer" onClick={() => navigate('/main')}>
                <FaTrainSubway />
                <span className="text-xl font-semibold">Metoronom</span>
            </div>
            {/* <div className="flex items-center">
                <div className="font-semibold mr-8 cursor-pointer" onClick={() => navigate('/write')}>
                    게시판
                </div>
                <div className="flex items-center">
                    {log === 'Logout' && (
                        <div className="flex justify-center items-center">
                            <div>
                                <FaUserCircle />
                            </div>
                            &nbsp;
                            <div className="font-semibold">{username}</div>&nbsp;&nbsp;&nbsp;
                        </div>
                    )}
                    <p className="font-bold mr-3 cursor-pointer" onClick={handleLoginClick}>
                        {log}
                    </p>
                </div>
            </div> */}
        </div>
    );
};

export default Navbar;
