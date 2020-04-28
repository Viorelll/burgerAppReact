import * as actionType from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionType.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispach => {
        setTimeout(() => {
            dispach(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispach => {
        dispach(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCf4zElGO-dMpvxpk0EMZPuYFEdliSJsPw';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCf4zElGO-dMpvxpk0EMZPuYFEdliSJsPw';
        }
        axios
            .post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); 
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispach(authSuccess(response.data.idToken, response.data.localId));
                dispach(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispach(authFailed(error.response.data.error));
            });

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispach => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispach(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
               dispach(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispach(authSuccess(token, userId));
                dispach(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};