import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
    Home, 
    FileText, 
    Menu, 
    Settings, 
    Briefcase,
    Image,
    Users,
    Mail,
    BarChart3,
    Shield
} from 'lucide-react'

const Navbar = ({ isOpen, onClose }) => {
    const location = useLocation()

    const menuItems = [
        {
            title: 'Anasayfa',
            path: '/',
            icon: Home
        },
        {
            title: 'Blog Yönetimi',
            path: '/blog',
            icon: FileText
        },
        {
            title: 'Menü Yönetimi',
            path: '/menu',
            icon: Menu
        },
        {
            title: 'Hizmetler',
            path: '/services',
            icon: Briefcase
        },
        {
            title: 'Galeri',
            path: '/gallery',
            icon: Image
        },
        {
            title: 'Kullanıcılar',
            path: '/users',
            icon: Users
        },
        {
            title: 'İletişim Formları',
            path: '/contact',
            icon: Mail
        },
        {
            title: 'Raporlar',
            path: '/reports',
            icon: BarChart3
        },
        {
            title: 'Güvenlik',
            path: '/security',
            icon: Shield
        },
        {
            title: 'Ayarlar',
            path: '/settings',
            icon: Settings
        }
    ]

    const handleLinkClick = () => {
        if (window.innerWidth < 1024) {
            onClose()
        }
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <Link to="/" className="sidebar-brand" onClick={handleLinkClick}>
                    Admin Panel
                </Link>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    
                    return (
                        <div key={item.path} className="nav-item">
                            <Link 
                                to={item.path} 
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                onClick={handleLinkClick}
                            >
                                <Icon size={20} />
                                <span>{item.title}</span>
                            </Link>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}

export default Navbar
