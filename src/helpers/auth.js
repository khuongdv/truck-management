let auth = {
    isLogin: () => !!localStorage.getItem('authtoken'),
    clear() {
        localStorage.clear();
        sessionStorage.clear();
    },
    settoken(token) {
        localStorage.setItem('authtoken', token);
    },
    gettoken() {
        return localStorage.getItem('authtoken');
    },
};
export default auth;
