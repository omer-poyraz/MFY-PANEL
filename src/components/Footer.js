import React from 'react'

const Footer = () => {
    return (
        <footer style={{
            padding: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            background: 'white',
            marginTop: 'auto'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    © 2025 Admin Panel. Tüm hakları saklıdır.
                </div>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem',
                    fontSize: '0.875rem'
                }}>
                    <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>
                        Gizlilik Politikası
                    </a>
                    <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>
                        Kullanım Şartları
                    </a>
                    <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>
                        Destek
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
