import {React, useState} from 'react';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';

export default function AppLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className=" flex font-sans bg-[#0D0D0D] scroll-smooth">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`flex-grow flex flex-col overflow-x-hidden 
                transition-margin duration-300 ease-in-out ${collapsed ? 'ml-[40px]' : 'ml-[190px]'} bg-[#0D0D0D]`}>
                <Header />
                <main className="w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
