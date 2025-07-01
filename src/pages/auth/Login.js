import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User, LogIn } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login, loading, error, isAuthenticated, clearError } = useAuth()
    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState({})

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, navigate])

    // Clear auth errors when component mounts
    useEffect(() => {
        clearError()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.username) {
            newErrors.username = 'Kullanıcı adı gereklidir'
        } else if (formData.username.length < 3) {
            newErrors.username = 'Kullanıcı adı en az 3 karakter olmalıdır'
        }
        
        if (!formData.password) {
            newErrors.password = 'Şifre gereklidir'
        } else if (formData.password.length < 3) {
            newErrors.password = 'Şifre en az 3 karakter olmalıdır'
        }
        
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        
        setErrors({})
        clearError()
        
        try {
            const result = await login({
                username: formData.username,
                password: formData.password,
                rememberMe
            })
            
            if (result.success) {
                navigate('/', { replace: true })
            } else {
                setErrors({ general: result.message || 'Giriş yapılırken bir hata oluştu' })
            }
        } catch (error) {
            setErrors({ general: 'Giriş yapılırken bir hata oluştu' })
        }
    }

    return (
        <div className="login-container">
            <div className="login-background">
                {/* Background decoration */}
                <div className="bg-decoration bg-decoration-1"></div>
                <div className="bg-decoration bg-decoration-2"></div>
                <div className="bg-decoration bg-decoration-3"></div>
            </div>
            
            <div className="login-content">
                <div className="login-card">
                    {/* Logo and Title */}
                    <div className="login-header">
                        <div className="login-logo">
                            <div className="logo-icon">
                                <Lock size={32} />
                            </div>
                        </div>
                        <h1 className="login-title">Admin Paneline Giriş</h1>
                        <p className="login-subtitle">
                            Yönetim paneline erişmek için giriş yapın
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {(errors.general || error) && (
                            <div className="error-message general-error">
                                {errors.general || error}
                            </div>
                        )}

                        {/* Username Field */}
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">
                                Kullanıcı Adı
                            </label>
                            <div className="input-wrapper">
                                <User size={20} className="input-icon" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`form-input ${errors.username ? 'error' : ''}`}
                                    placeholder="Kullanıcı adınızı girin"
                                    disabled={loading}
                                />
                            </div>
                            {errors.username && (
                                <span className="error-message">{errors.username}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Şifre
                            </label>
                            <div className="input-wrapper">
                                <Lock size={20} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="form-options">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    className="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="checkbox-text">Beni hatırla</span>
                            </label>
                            <a href="#" className="forgot-link">
                                Şifremi unuttum
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`login-button ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Giriş Yap
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
