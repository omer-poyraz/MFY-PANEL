import React from 'react'
import North from '../../components/North'
import { BarChart3, Users, FileText, TrendingUp } from 'lucide-react'

const Home = () => {
    const stats = [
        {
            title: 'Toplam Kullanıcılar',
            value: '1,234',
            change: '+12%',
            icon: Users,
            color: '#3b82f6'
        },
        {
            title: 'Blog Yazıları',
            value: '89',
            change: '+5%',
            icon: FileText,
            color: '#10b981'
        },
        {
            title: 'Aylık Görüntülenme',
            value: '45.2K',
            change: '+18%',
            icon: BarChart3,
            color: '#f59e0b'
        },
        {
            title: 'Dönüşüm Oranı',
            value: '2.4%',
            change: '+0.3%',
            icon: TrendingUp,
            color: '#ef4444'
        }
    ]

    const recentActivities = [
        { id: 1, action: 'Yeni blog yazısı eklendi', user: 'Admin', time: '2 dk önce' },
        { id: 2, action: 'Kullanıcı profili güncellendi', user: 'Ahmet Y.', time: '15 dk önce' },
        { id: 3, action: 'Menü yapısı değiştirildi', user: 'Admin', time: '1 saat önce' },
        { id: 4, action: 'Yeni kullanıcı kaydı', user: 'Mehmet K.', time: '2 saat önce' },
    ]

    return (
        <North pageTitle="Dashboard">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-description">
                    Yönetim paneline hoş geldiniz. Burada sitenizin genel durumunu takip edebilirsiniz.
                </p>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="card">
                            <div className="card-body">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
                                            {stat.title}
                                        </p>
                                        <p style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                                            {stat.value}
                                        </p>
                                        <p style={{ 
                                            color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                                            fontSize: '0.875rem',
                                            margin: 0
                                        }}>
                                            {stat.change} bu ay
                                        </p>
                                    </div>
                                    <div style={{
                                        width: '3rem',
                                        height: '3rem',
                                        borderRadius: '0.5rem',
                                        background: `${stat.color}20`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon size={24} style={{ color: stat.color }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Son Aktiviteler */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Son Aktiviteler</h3>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentActivities.map(activity => (
                                <div key={activity.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    background: '#f8fafc',
                                    borderRadius: '0.375rem'
                                }}>
                                    <div style={{
                                        width: '0.5rem',
                                        height: '0.5rem',
                                        background: '#3b82f6',
                                        borderRadius: '50%',
                                        marginRight: '0.75rem'
                                    }}></div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>
                                            {activity.action}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hızlı Erişim */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Hızlı Erişim</h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <a href="/blog" className="btn btn-primary" style={{ textAlign: 'center' }}>
                                <FileText size={20} />
                                Yeni Blog
                            </a>
                            <a href="/users" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                                <Users size={20} />
                                Kullanıcılar
                            </a>
                            <a href="/settings" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                                <BarChart3 size={20} />
                                Raporlar
                            </a>
                            <a href="/settings" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                                <TrendingUp size={20} />
                                Ayarlar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </North>
    )
}

export default Home
