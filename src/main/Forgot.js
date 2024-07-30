import React, { useRef, useState } from 'react';
import { IoKeyOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
    const navigate = useNavigate();
    const emailref = useRef(null);
    const pwd1ref = useRef(null);
    const pwd2ref = useRef(null);
    const numref = useRef(null);
    const [send, setSend] = useState(false);
    const [check, setCheck] = useState(false);

    const handleSendEmail = async () => {
        const email = emailref.current.value;

        if (!email) {
            alert("Please enter your email")
            emailref.current.focus();
            return;
        }

        const url = 'http://10.125.121.200:8080/';

        const payload = {
            email: email
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            setSend(true);
        } else {
            alert('No registered email.');
            emailref.current.value = "";
            emailref.current.focus();
        };
    }

    const handlecheck = async () => {

        if (!numref.current.value) {
            alert("Please enter your Authentication number")
            numref.current.focus();
            return;
        }

        const url = 'http://10.125.121.200:8080/';

        const payload = {
            num: numref.current.value
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.ok) {
            setCheck(true)
        } else {
            alert('Authentication failed. Please re-enter.');
            numref.current.value = "";
            numref.current.focus();
        };
    }

    const handleReset = async () => {

        if (!emailref.current.value) {
            alert("Please enter your new email")
            emailref.current.focus()
            return;
        };

        if (!pwd1ref.current.value) {
            alert("Please enter your new password")
            pwd1ref.current.focus()
            return;
        };

        if (!pwd2ref.current.value) {
            alert("Please enter your new password again")
            pwd2ref.current.focus()
            return;
        };

        if (pwd1ref.current.value !== pwd2ref.current.value) {
            alert("Passwords do not match. Please enter them again.");
            pwd1ref.current.value = '';
            pwd2ref.current.value = '';
            return;
        };

        const url = 'http://10.125.121.200:8080/';

        const payload = {
            email: emailref.current.value,
            password: pwd1ref.current.value
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("비밀번호 재설정 성공! : ", data.password);
            navigate('/login');
        } else {
            alert('Failed to reset password. You have entered the wrong email.');
            emailref.current.value = "";
            pwd1ref.current.value = '';
            pwd2ref.current.value = '';
            emailref.current.focus();
        };
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-auto rounded-xl p-6 bg-slate-100">
                <IoMdArrowBack className='text-xl cursor-pointer' onClick={() => { navigate('/login') }} />
                <div className="flex justify-center">
                    <IoKeyOutline className="text-4xl text-black" />
                </div>
                <p className="text-2xl text-center font-bold mt-4">Forgot password?</p>
                <p className="text-center text-gray-600 mt-2">Don't worry, we'll reset your password.</p>
                <div className="flex flex-col mt-6">
                    <label className="text-gray-700 font-semibold">Email address</label>
                    <div className='flex items-center'>
                        <input type="text" placeholder="name@company.com" className="rounded-md h-10 p-2 w-4/5" ref={emailref} />
                        <button type='button' className='bg-gray-600 rounded-xl w-1/5 ml-2 text-white h-10' onClick={handleSendEmail}>Send</button>
                    </div>
                    {send ?
                        <div className='mt-2'>
                            <label className="text-gray-700 font-semibold">Authentication number</label>
                            <div className='flex items-center'>
                                <input type="text" placeholder='123456' className='rounded-md h-10 p-2 w-4/5' ref={numref} />
                                <button type='button' className='bg-gray-600 rounded-xl w-1/5 ml-2 text-white h-10' onClick={handlecheck}>Check</button>
                            </div>
                        </div> : ""}
                </div>
                {check ? <>
                    <div className='flex flex-col mt-2'>
                        <label className="text-gray-700 font-semibold">New password</label>
                        <input type='password' placeholder='●●●●●●●●' className='rounded-md h-10 p-2' ref={pwd1ref} />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <label className="text-gray-700 font-semibold">Confirm new password</label>
                        <input type='password' placeholder='●●●●●●●●' className='rounded-md h-10 p-2' ref={pwd2ref} />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" onClick={handleReset} className="bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-600">Reset password</button>
                    </div>
                </> : ""}
            </div>
        </div>
    )
}
