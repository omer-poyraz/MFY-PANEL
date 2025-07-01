import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = ({ onMenuToggle, pageTitle = "Dashboard" }) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const userMenuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login', { replace: true })
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const handleProfile = () => {
        setShowUserMenu(false)
        navigate('/profile')
    }

    const handleSettings = () => {
        setShowUserMenu(false)
        navigate('/settings')
    }

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user) return 'A'
        const firstName = user.firstName || user.name || user.email || 'Admin'
        const lastName = user.lastName || ''
        return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
    }

    // Get display name
    const getDisplayName = () => {
        if (!user) return 'Admin'
        return user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name || user.email || 'Admin'
    }

    // Get email
    const getEmail = () => {
        return user?.email || 'admin@panel.com'
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header className="header">
            <div className="header-left">
                <button 
                    className="menu-toggle"
                    onClick={onMenuToggle}
                >
                    <Menu size={24} />
                </button>
                <h1 className="header-title">{pageTitle}</h1>
            </div>

            <div className="header-right">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <Search size={16} style={{ color: '#64748b' }} />
                        <input 
                            type="text" 
                            placeholder="Ara..." 
                            className="search-input"
                        />
                    </div>
                </div>

                {/* User Menu */}
                <div style={{ position: 'relative' }} ref={userMenuRef}>
                    <button 
                        className="user-menu"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="user-avatar">
                            {getUserInitials()}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{getDisplayName()}</span>
                            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{getEmail()}</span>
                        </div>
                    </button>

                    {showUserMenu && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '0.5rem',
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            width: '200px',
                            zIndex: 1000
                        }}>
                            <div style={{ padding: '0.5rem' }}>
                                <button 
                                    onClick={handleProfile}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 0.75rem',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <User size={16} />
                                    Profil
                                </button>
                                <button 
                                    onClick={handleSettings}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 0.75rem',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <Settings size={16} />
                                    Ayarlar
                                </button>
                                <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                                <button 
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 0.75rem',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.875rem',
                                        color: '#ef4444'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <LogOut size={16} />
                                    Çıkış Yap
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
