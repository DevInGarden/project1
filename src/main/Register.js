import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

export default function Register() {
    const navigate = useNavigate();
    const nameref = useRef(null);
    const emailref = useRef(null);
    const pwdref = useRef(null);
    const [agree, setAgree] = useState(false);

    const handleSign = async () => {

        if (!nameref.current.value) {
            alert("Please enter your name")
            nameref.current.focus()
            return;
        };

        if (!emailref.current.value) {
            alert("Please enter your email")
            emailref.current.focus()
            return;
        };

        if (!pwdref.current.value) {
            alert("Please enter your password")
            pwdref.current.focus()
            return;
        };

        if (!agree) {
            alert('You must agree to the Terms and Conditions.');
            return;
        };

        const url = 'http://10.125.121.200:8080/signup';

        const payload = {
            name: nameref.current.value,
            email: emailref.current.value,
            password: pwdref.current.value
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
            console.log("성공! 이메일 주소 : ", data.email);
            navigate('/login');
        } else {
            alert('Failed to register. There is a duplicate email, please re-enter it.');
            emailref.current.value = "";
            emailref.current.focus();
        };
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 h-auto rounded-xl p-6 bg-slate-100">
                <IoMdArrowBack className='text-xl cursor-pointer' onClick={() => { navigate('/login') }} />
                <p className="text-2xl text-center font-bold mt-4">Create your free account</p>
                <div className='flex items-center justify-center mt-2'>
                    <p className="text-center text-gray-600">Already having an ID?</p>&nbsp;
                    <p onClick={() => navigate('/login')} className='text-blue-500 font-semibold cursor-pointer'>Login here</p>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-gray-700 font-semibold">Your name</label>
                    <input type="text" placeholder="alex" className="mt-2 rounded-md h-10 p-2" ref={nameref} />
                    <label className="text-gray-700 font-semibold mt-2">Your email</label>
                    <input type="text" placeholder="name@company.com" className='rounded-md h-10 p-2 mt-2' ref={emailref}></input>
                    <label className="text-gray-700 font-semibold mt-2">Password</label>
                    <input type='password' placeholder=' ●●●●●●●●' className='rounded-md h-10 p-2 mt-2' ref={pwdref}></input>
                </div>
                <div className='mt-2'>
                    <input type='checkbox' checked={agree} onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label className='ml-2'>I agree to the <span className='underline'>Terms and Conditions</span></label>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="submit" onClick={handleSign} className="bg-blue-500 rounded-md h-10 w-5/6 text-white hover:bg-blue-600">Sign in</button>
                </div>
            </div>
        </div>
    )
}
