import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Header from './Header'

const North = ({ children, pageTitle }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarOpen && window.innerWidth < 1024) {
                const sidebar = document.querySelector('.sidebar')
                if (sidebar && !sidebar.contains(event.target) && !event.target.closest('.menu-toggle')) {
                    setSidebarOpen(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [sidebarOpen])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true)
            } else {
                setSidebarOpen(false)
            }
        }

        // Set initial state
        handleResize()
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="admin-layout">
            <Navbar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />
            <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Header 
                    onMenuToggle={toggleSidebar}
                    pageTitle={pageTitle}
                />
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default North
