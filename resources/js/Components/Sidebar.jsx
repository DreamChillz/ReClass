import { React, useState } from 'react'
import { Link, router } from '@inertiajs/react'
import { SidebarData } from './SidebarData'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function Sidebar({ collapsed, setCollapsed }) {
  const handleLogout = () => {
    // Inertia logout via POST (uses Laravel Breeze’s /logout route)
    router.post('/logout')
  }
  const widthClass = collapsed ? ' w-[40px]' : 'w-[190px]';

  return (
    <div className={`fixed top-0 left-0 bottom-0 ${widthClass} bg-[#1a1a1a] flex flex-col 
             transition-all duration-300 ease-in-out
             overflow-hidden z-50`}>

      <div className="flex items-center p-2">
        {!collapsed && <img src={"images/2.png"} alt="logo" className={` w-[150px] h-auto object-contain`} />}
        {/* Toggle Button */}
        <button
          className=" text-white"
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? <KeyboardDoubleArrowRightIcon className="text-[#787878]" /> :
            <KeyboardDoubleArrowLeftIcon className="text-[#787878]" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">

          {SidebarData.map((item, idx) => {
            const commonClasses =
              " flex items-center p-2 hover:bg-[#2e2e2e] cursor-pointer"

            if (item.action === 'logout') {
              return (
                <li
                  key={idx}
                  className={commonClasses}
                  onClick={handleLogout}
                >
                  <div className="w-8 text-center text-white">{item.icon}</div>
                  {!collapsed && <div className="ml-2 text-white">{item.title}</div>}
                </li>
              )
            }

            return (
              <li key={idx}>
                <Link href={item.link} className={commonClasses}>
                  <div className="w-8 text-center text-white">{item.icon}</div>
                  {!collapsed && <div className="ml-2 text-white">{item.title}</div>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
