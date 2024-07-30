import React from 'react';
import Navbar from './Navbar';
import Count from './Count';
import Pic from './Pic';
import Map from './Map';
import Table from './Table';
import Air from './Air';

const Main = () => {
    return (
        <div className="bg-gray-300 bg-opacity-50 w-full h-screen flex flex-col p-3 space-y-2">
            <Navbar />
            <div className="flex-[8] flex-shrink-0 h-3/5 flex items-center space-x-2">
                <Count />
                <Pic />
            </div>
            <div className="w-full flex-[3.5] flex space-x-2">
                <Map />
                <Table />
                <Air />
            </div>
        </div>
    );
};

export default Main;
