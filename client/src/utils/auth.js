import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        const token = this.getToken();
        if (token) {
          return decode(token);
        }
        return null;
      }

    loggedIn() {
        const token = this.getToken();
        const user = decode(token);
        const isTokenExpired = this.isTokenExpired(token);
    
        return {
            loggedIn: !!token && !isTokenExpired,
            userId: user.id || null,
        };
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        console.log(idToken);
        window.location.assign('/admin/index');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/auth/login');
      }
}

const authService = new AuthService();
export default authService;