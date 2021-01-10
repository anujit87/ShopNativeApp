import AsyncStorage from "@react-native-community/async-storage";
export const AUTHENTICATE = 'Authenticate';
export const LOGOUT = 'Logout';

let timer;

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() }));
}

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userId,
            token
        });
    }
}
const clearLogoutTimer = () => {
    if (timer) clearTimeout(timer);
}

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
}

const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime / 1000);
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZdRX1uxF3EypryGjxFbSR3RvSbM9ywNI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This Email already exists!';
            }
            throw new Error(message);
        }
        const responseData = await response.json();
        dispatch(authenticate(responseData.localId, responseData.token, parseInt(responseData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
}
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZdRX1uxF3EypryGjxFbSR3RvSbM9ywNI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This Email does not exist! Please sign up';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'The password is incorrect!';
            }
            throw new Error(message);
        }
        const responseData = await response.json();
        dispatch(authenticate(responseData.localId, responseData.token, parseInt(responseData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
}