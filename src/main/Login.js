import React, { useRef } from 'react'
import { FaTrainSubway } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { inout } from './RecoilAtom';
import { useRecoilState } from 'recoil';

export default function Login() {
    const navigate = useNavigate();
    const emailref = useRef(null);
    const pwdref = useRef(null);
    const [log, setLog] = useRecoilState(inout);

    const decodeToken = (token) => {
        if (!token) {
            return null;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    const handleLogin = async () => {
        if (!emailref.current.value) {
            alert("Please enter your email")
            emailref.current.focus()
            return;
        }
        if (!pwdref.current.value) {
            alert("Please enter your password")
            pwdref.current.focus()
            return;
        }

        const payload = {
            email: emailref.current.value,
            password: pwdref.current.value
        }

        const url = 'http://10.125.121.200:8080/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const result = await response.json();
                const token = response.headers.get('Authorization');
                const decodedToken = decodeToken(token);
                console.log('Decoded Token:', decodedToken);

                console.log("token1", token)

                localStorage.setItem("email", result.email);
                localStorage.setItem("role", result.role);

                console.log("로그인 성공, 이메일주소 : ", result.email);
                console.log("로그인 성공, 롤 : ", result.role);
                navigate('/main');
                setLog("Logout")
            } else {
                alert('Failed to login. Please try again.');
                emailref.current.value = "";
                emailref.current.focus();
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className=' w-96 h-100 bg-slate-100 rounded-xl p-6'>
                <div className='flex justify-end'>
                    <MdHome className='text-xl cursor-pointer' onClick={() => { navigate('/main') }} />
                </div>
                <div className='flex justify-center'>
                    <FaTrainSubway className='text-3xl' />&nbsp;
                    <p className='text-2xl font-semibold'>Metronom</p>
                </div>
                <p className='text-xl text-center font-semibold mt-3'>Sign in to your account</p>
                <div className="flex flex-col mt-6">
                    <label className="text-gray-700 font-semibold">Your email</label>
                    <input type="text" placeholder="name@company.com" className="mt-2 rounded-md h-10 p-2" ref={emailref} />
                </div>
                <div className='flex flex-col mt-2'>
                    <label className="text-gray-700 font-semibold">Password</label>
                    <input type='password' placeholder=' ●●●●●●●●' className='rounded-md h-10 p-2 mt-2' ref={pwdref}></input>
                </div>
                <div className='flex justify-end mt-3'>
                    <p onClick={() => navigate('/forgot')} className='text-blue-600 font-semibold cursor-pointer'>Forgot password?</p>
                </div>
                <div className='flex justify-center mt-4'>
                    <button type='submit' onClick={handleLogin} className='bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-800'>Log in to your account</button>
                </div>
                <div className='flex justify-center mt-4'>
                    <p onClick={() => navigate('/register')} className='text-blue-600 font-semibold cursor-pointer'>Don't have an account</p>
                </div>
            </div>
        </div>
    )
}
