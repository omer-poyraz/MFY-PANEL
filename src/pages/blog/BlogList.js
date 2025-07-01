import React, { useState } from 'react'
import North from '../../components/North'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const BlogList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    
    const blogPosts = [
        {
            id: 1,
            title: 'React ile Modern Web Geliştirme',
            slug: 'react-modern-web-gelistirme',
            author: 'Admin',
            status: 'Yayında',
            publishDate: '2025-01-01',
            views: 1250
        },
        {
            id: 2,
            title: 'Node.js ve Express ile API Geliştirme',
            slug: 'nodejs-express-api-gelistirme',
            author: 'Admin',
            status: 'Taslak',
            publishDate: '2025-01-02',
            views: 850
        },
        {
            id: 3,
            title: 'Responsive Tasarım İlkeleri',
            slug: 'responsive-tasarim-ilkeleri',
            author: 'Admin',
            status: 'Yayında',
            publishDate: '2024-12-28',
            views: 2100
        }
    ]

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status) => {
        switch (status) {
            case 'Yayında':
                return '#10b981'
            case 'Taslak':
                return '#f59e0b'
            default:
                return '#64748b'
        }
    }

    return (
        <North pageTitle="Blog Yönetimi">
            <div className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 className="page-title">Blog Yönetimi</h1>
                        <p className="page-description">
                            Blog yazılarınızı buradan yönetebilirsiniz.
                        </p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                        Yeni Blog Yazısı
                    </button>
                </div>
            </div>

            {/* Arama ve Filtreler */}
            <div className="card mb-6">
                <div className="card-body">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                background: '#f8fafc', 
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 0.75rem',
                                gap: '0.5rem'
                            }}>
                                <Search size={16} style={{ color: '#64748b' }} />
                                <input 
                                    type="text" 
                                    placeholder="Blog ara..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        outline: 'none',
                                        flex: 1,
                                        fontSize: '0.875rem'
                                    }}
                                />
                            </div>
                        </div>
                        <select style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.375rem',
                            background: 'white',
                            fontSize: '0.875rem'
                        }}>
                            <option>Tüm Durumlar</option>
                            <option>Yayında</option>
                            <option>Taslak</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Blog Listesi */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Blog Yazıları ({filteredPosts.length})</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                                        Başlık
                                    </th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                                        Yazar
                                    </th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                                        Durum
                                    </th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                                        Tarih
                                    </th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                                        Görüntülenme
                                    </th>
                                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151' }}>
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map(post => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div>
                                                <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                                                    {post.title}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                                    /{post.slug}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#64748b' }}>
                                            {post.author}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                background: `${getStatusColor(post.status)}20`,
                                                color: getStatusColor(post.status)
                                            }}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#64748b' }}>
                                            {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td style={{ padding: '1rem', color: '#64748b' }}>
                                            {post.views.toLocaleString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                <button style={{
                                                    padding: '0.5rem',
                                                    border: 'none',
                                                    background: '#f1f5f9',
                                                    borderRadius: '0.25rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Eye size={16} style={{ color: '#64748b' }} />
                                                </button>
                                                <button style={{
                                                    padding: '0.5rem',
                                                    border: 'none',
                                                    background: '#f1f5f9',
                                                    borderRadius: '0.25rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Edit size={16} style={{ color: '#64748b' }} />
                                                </button>
                                                <button style={{
                                                    padding: '0.5rem',
                                                    border: 'none',
                                                    background: '#fef2f2',
                                                    borderRadius: '0.25rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Trash2 size={16} style={{ color: '#ef4444' }} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </North>
    )
}

export default BlogList
