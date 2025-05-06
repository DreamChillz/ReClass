import React from 'react'
import { Link, router } from '@inertiajs/react'
import classes from '../Layouts/AppLayout.module.css'
import { SidebarData } from './SidebarData'

export default function Sidebar() {
  const handleLogout = () => {
    // Inertia logout via POST (uses Laravel Breeze’s /logout route)
    router.post('/logout')
  }

  return (
    <div className={classes.Sidebar}>
      <ul className={classes.SidebarList}>
        <li className={classes.logoItem}>
          <Link href="/">
            <img src={"images/DreamChillz.jpg"} alt="logo" className={classes.logo} />
          </Link>
        </li>

        {SidebarData.map((item, idx) => {
          if (item.action === 'logout') {
            return (
              <li
                key={idx}
                className={classes.row}
                onClick={handleLogout}
              >
                <div className={classes.icon}>{item.icon}</div>
                <div className={classes.title}>{item.title}</div>
              </li>
            )
          }

          return (
            <li key={idx}>
              <Link href={item.link} className={classes.row}>
                <div className={classes.icon}>{item.icon}</div>
                <div className={classes.title}>{item.title}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
