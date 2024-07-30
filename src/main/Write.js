import React from 'react';
import Navbar from './Navbar';

const Write = () => {
    return (
        <div className="bg-gray-300 bg-opacity-50 w-full h-screen flex flex-col p-3">
            <Navbar />
            <main className="flex flex-col items-center mt-6">
                <table className="border-gray-300 bg-white shadow-md w-5/6">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="border border-gray-500 px-4 py-2 w-1/10">번호</th>
                            <th className="border border-gray-500 px-4 py-2 w-3/5">내용</th>
                            <th className="border border-gray-500 px-4 py-2 w-1/5">날짜</th>
                            <th className="border border-gray-500 px-4 py-2 w-1/10">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-500 px-4 py-2 text-center">a</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">b</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">c</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">d</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end mt-3 mr-10 w-5/6">
                    <button type="button" className="bg-gray-300 px-3 py-2 rounded-xl font-semibold">
                        쓰기
                    </button>
                </div>
            </main>
        </div>

    );
};

export default Write;
