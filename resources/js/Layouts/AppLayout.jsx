import React from 'react'
import Sidebar from '@/Components/Sidebar'
import Header from '@/Components/Header'
import Profile from '@/Components/Profile'
import classes from "./AppLayout.module.css"

export default function AppLayout({ children }) {
    return (
        <div className={classes.App}>                     
            <Sidebar />
            <div className={classes.AppContent}>
                <div className={classes.HeaderProfile}>
                    <Header />
                    <Profile />
                </div>
                <div className={classes.PageContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}
