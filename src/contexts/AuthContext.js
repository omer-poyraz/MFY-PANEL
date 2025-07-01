import React, { createContext, useContext, useReducer, useEffect } from 'react'
import apiService from '../services/api'

// Auth context
const AuthContext = createContext()

// Auth state
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
    isLoading: true,
    error: null
}

// Auth reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

// Auth Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    // Token doğrulama ve otomatik giriş
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('auth_token')
            const userData = localStorage.getItem('user_data')
            
            if (token && userData && userData !== 'undefined') {
                try {
                    // API service'e token'ı set et
                    apiService.setAuthToken(token)
                    
                    // Kullanıcı bilgilerini localStorage'dan al
                    const user = JSON.parse(userData)
                    
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            user: user,
                            token: token
                        }
                    })
                } catch (error) {
                    console.error('Token initialization failed:', error)
                    // Token geçersiz, temizle
                    localStorage.removeItem('auth_token')
                    localStorage.removeItem('user_data')
                    apiService.setAuthToken(null)
                    dispatch({ type: 'LOGOUT' })
                }
            } else {
                // Token yok veya geçersiz, loading'i kapat
                if (token || userData) {
                    // Geçersiz veri varsa temizle
                    localStorage.removeItem('auth_token')
                    localStorage.removeItem('user_data')
                    apiService.setAuthToken(null)
                }
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        }

        initializeAuth()
    }, [])

    // Login fonksiyonu
    const login = async (credentials) => {
        dispatch({ type: 'LOGIN_START' })
        
        try {
            const { username, password } = credentials
            const response = await apiService.login(username, password)
            
            console.log('Login response:', response) // Debug log
            
            if (response.success) {
                // Response'ta user bilgisi var mı kontrol et
                if (!response.user) {
                    console.warn('No user data in response, creating mock user')
                    response.user = {
                        id: 1,
                        username: username,
                        firstName: 'Admin',
                        lastName: 'User',
                        email: `${username}@example.com`
                    }
                }
                
                // Token ve kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem('auth_token', response.token)
                localStorage.setItem('user_data', JSON.stringify(response.user))
                
                console.log('Saved to localStorage:', { // Debug log
                    token: response.token,
                    user: response.user
                })
                
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        user: response.user,
                        token: response.token
                    }
                })
                return { success: true }
            } else {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: response.error || 'Giriş başarısız'
                })
                return { success: false, message: response.error }
            }
        } catch (error) {
            const errorMessage = error.message || 'Giriş sırasında bir hata oluştu'
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: errorMessage
            })
            return { success: false, message: errorMessage }
        }
    }

    // Logout fonksiyonu
    const logout = async () => {
        try {
            await apiService.logout()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            // Token ve kullanıcı bilgilerini temizle
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
            apiService.setAuthToken(null)
            dispatch({ type: 'LOGOUT' })
        }
    }

    // Profil güncelleme
    const updateProfile = async (profileData) => {
        try {
            const response = await apiService.updateProfile(profileData)
            if (response.success) {
                dispatch({
                    type: 'SET_USER',
                    payload: response.user
                })
                return { success: true }
            }
            return { success: false, error: response.error }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Hata temizleme
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' })
    }

    const value = {
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.isLoading,
        error: state.error,
        login,
        logout,
        updateProfile,
        clearError
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Auth hook
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
