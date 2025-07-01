// API Service - Tüm API çağrılarını yöneten merkezi servis

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
        this.token = localStorage.getItem('auth_token')
    }

    // Auth token'ı set etmek için
    setAuthToken(token) {
        this.token = token
        if (token) {
            localStorage.setItem('auth_token', token)
        } else {
            localStorage.removeItem('auth_token')
        }
    }

    // Temel fetch wrapper
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        // Auth token varsa header'a ekle
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`
        }

        // FormData için Content-Type'ı kaldır (browser otomatik set eder)
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type']
        }

        try {
            const response = await fetch(url, config)
            
            // Response JSON değilse (örneğin file download)
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                if (response.ok) {
                    return response
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
            }

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`)
            }

            return data
        } catch (error) {
            console.error('API Request Error:', error)
            throw error
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' })
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: data instanceof FormData ? data : JSON.stringify(data),
        })
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: data instanceof FormData ? data : JSON.stringify(data),
        })
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' })
    }

    // ============ AUTH ENDPOINTS ============
    
    // Kullanıcı girişi
    async login(username, password) {
        const response = await this.post('/api/Login', { username, password })
        if (response.success && response.token) {
            this.setAuthToken(response.token)
        }
        return response
    }

    // Kullanıcı çıkışı
    async logout() {
        try {
            const response = await this.post('/api/Logout')
            this.setAuthToken(null)
            return response
        } catch (error) {
            // Logout başarısız olsa bile token'ı temizle
            this.setAuthToken(null)
            return { success: true }
        }
    }

    // Token doğrulama
    async verifyToken() {
        return this.get('/api/verify-token')
    }

    // Şifre sıfırlama
    async forgotPassword(email) {
        return this.post('/api/forgot-password', { email })
    }

    // ============ USER ENDPOINTS ============
    
    // Kullanıcı profili
    async getUserProfile() {
        return this.get('/api/users/profile')
    }

    // Profil güncelleme
    async updateProfile(data) {
        return this.put('/api/users/profile', data)
    }

    // Şifre değiştirme
    async changePassword(currentPassword, newPassword) {
        return this.post('/api/users/change-password', { currentPassword, newPassword })
    }

    // ============ BLOG ENDPOINTS ============
    
    // Blog listesi (pagination ile)
    async getBlogs(page = 1, limit = 10, search = '') {
        const params = new URLSearchParams({ page, limit, search })
        return this.get(`/api/Blog?${params}`)
    }

    // Blog detayı
    async getBlog(id) {
        return this.get(`/api/Blog/${id}`)
    }

    // Blog oluşturma
    async createBlog(blogData) {
        return this.post('/api/Blog', blogData)
    }

    // Blog güncelleme
    async updateBlog(id, blogData) {
        return this.put(`/api/Blog/${id}`, blogData)
    }

    // Blog silme
    async deleteBlog(id) {
        return this.delete(`/api/Blog/${id}`)
    }

    // Blog sıralaması güncelleme
    async updateBlogOrder(orderList) {
        return this.post('/api/Blog/order', { orderList })
    }

    // ============ MENU ENDPOINTS ============
    
    // Menü listesi
    async getMenus() {
        return this.get('/api/Menu')
    }

    // Menü oluşturma
    async createMenu(menuData) {
        return this.post('/api/Menu', menuData)
    }

    // Menü güncelleme
    async updateMenu(id, menuData) {
        return this.put(`/api/Menu/${id}`, menuData)
    }

    // Menü silme
    async deleteMenu(id) {
        return this.delete(`/api/Menu/${id}`)
    }

    // ============ SETTINGS ENDPOINTS ============
    
    // Site ayarları
    async getSettings() {
        return this.get('/api/Settings')
    }

    // Ayarları güncelleme
    async updateSettings(settingsData) {
        return this.put('/api/Settings', settingsData)
    }

    // ============ COMPANY ENDPOINTS ============
    
    // Şirket bilgileri
    async getCompany() {
        return this.get('/api/company')
    }

    // Şirket bilgilerini güncelleme
    async updateCompany(companyData) {
        return this.put('/api/company', companyData)
    }

    // ============ SHOWCASE ENDPOINTS ============
    
    // Vitrin listesi
    async getShowcases() {
        return this.get('/showcases')
    }

    // Vitrin oluşturma
    async createShowcase(showcaseData) {
        return this.post('/showcases', showcaseData)
    }

    // Vitrin güncelleme
    async updateShowcase(id, showcaseData) {
        return this.put(`/showcases/${id}`, showcaseData)
    }

    // Vitrin silme
    async deleteShowcase(id) {
        return this.delete(`/showcases/${id}`)
    }

    // ============ FORM ENDPOINTS ============
    
    // Form gönderileri
    async getForms(page = 1, limit = 10) {
        const params = new URLSearchParams({ page, limit })
        return this.get(`/forms?${params}`)
    }

    // Form detayı
    async getForm(id) {
        return this.get(`/forms/${id}`)
    }

    // Form silme
    async deleteForm(id) {
        return this.delete(`/forms/${id}`)
    }

    // ============ PAGE ENDPOINTS ============
    
    // Sayfa listesi
    async getPages() {
        return this.get('/pages')
    }

    // Sayfa oluşturma
    async createPage(pageData) {
        return this.post('/pages', pageData)
    }

    // Sayfa güncelleme
    async updatePage(id, pageData) {
        return this.put(`/pages/${id}`, pageData)
    }

    // Sayfa silme
    async deletePage(id) {
        return this.delete(`/pages/${id}`)
    }

    // ============ SOCIAL MEDIA ENDPOINTS ============
    
    // Sosyal medya listesi
    async getSocialMedia() {
        return this.get('/social-media')
    }

    // Sosyal medya oluşturma
    async createSocialMedia(socialData) {
        return this.post('/social-media', socialData)
    }

    // Sosyal medya güncelleme
    async updateSocialMedia(id, socialData) {
        return this.put(`/social-media/${id}`, socialData)
    }

    // Sosyal medya silme
    async deleteSocialMedia(id) {
        return this.delete(`/social-media/${id}`)
    }

    // ============ FILE UPLOAD ENDPOINTS ============
    
    // Dosya yükleme (genel)
    async uploadFile(file, type = 'general') {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)
        
        return this.post('/upload', formData)
    }

    // Blog resmi yükleme
    async uploadBlogImage(file) {
        const formData = new FormData()
        formData.append('file', file)
        
        return this.post('/upload/blog', formData)
    }

    // Şirket logosu yükleme
    async uploadCompanyLogo(file) {
        const formData = new FormData()
        formData.append('file', file)
        
        return this.post('/upload/company', formData)
    }

    // ============ DASHBOARD STATS ============
    
    // Dashboard istatistikleri
    async getDashboardStats() {
        return this.get('/dashboard/stats')
    }

    // Son aktiviteler
    async getRecentActivities(limit = 10) {
        return this.get(`/dashboard/activities?limit=${limit}`)
    }
}

// Singleton instance
const apiService = new ApiService()

export default apiService

// Named exports for convenience
export const {
    // Auth
    login,
    logout,
    verifyToken,
    forgotPassword,
    
    // User
    getUserProfile,
    updateProfile,
    changePassword,
    
    // Blog
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    updateBlogOrder,
    
    // Menu
    getMenus,
    createMenu,
    updateMenu,
    deleteMenu,
    
    // Settings
    getSettings,
    updateSettings,
    
    // Company
    getCompany,
    updateCompany,
    
    // Showcase
    getShowcases,
    createShowcase,
    updateShowcase,
    deleteShowcase,
    
    // Forms
    getForms,
    getForm,
    deleteForm,
    
    // Pages
    getPages,
    createPage,
    updatePage,
    deletePage,
    
    // Social Media
    getSocialMedia,
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    
    // File Upload
    uploadFile,
    uploadBlogImage,
    uploadCompanyLogo,
    
    // Dashboard
    getDashboardStats,
    getRecentActivities,
} = apiService
