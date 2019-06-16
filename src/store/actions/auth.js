import axios from 'axios'
import {
	AUTH_LOGOUT,
	AUTH_SUCCESS
} from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
    	const authData = {
    		email, password,
				returnSecureLogin: true
			}

			let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAecCr5AlT9F1o0LeqcmRj56JtHph9Zjc0'

			if (isLogin) {
				url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAecCr5AlT9F1o0LeqcmRj56JtHph9Zjc0'
			}

			const response = await axios.post(url, authData)
			console.log(response.data)
			const data = response.data

			const expirationDate = new Date(new Date().getTime() + /*data.expiresIn*/ 3600 * 1000)

			localStorage.setItem('token', data.idToken)
			localStorage.setItem('userId', data.localId)
			localStorage.setItem('expirationDate', expirationDate)
			
			dispatch(authSuccess(data.idToken))
			dispatch(autoLogout(3600))
		}
}

export function autoLogout(time) {
    return dispatch => {
    	setTimeout(() => {
				dispatch(logout())
			}, time * 1000)
		}
}

export function logout() {
    return {
    	type: AUTH_LOGOUT
		}
}

export function authSuccess(token) {
    return {
    	type: AUTH_SUCCESS,
			token
		}
}