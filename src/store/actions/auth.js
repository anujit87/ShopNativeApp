export const SIGNUP = 'Signup';
export const LOGIN = 'Login';

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
        dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId });
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
        dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId });
    }
}