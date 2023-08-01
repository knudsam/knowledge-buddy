import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    getToken() {
        return localStorage.getItem('id_token');
      }
    
      isTokenExpired(token) {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('id_token');
          return true;
        }
        // if the token is not expired
        return false;
      }

      login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }
    
      logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
      }
    }
    
    export default new AuthService(); 