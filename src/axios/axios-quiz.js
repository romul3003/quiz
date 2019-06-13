import axios from 'axios'

export default axios.create({
	baseURL: 'https://quiz-2f1b6.firebaseio.com/'
})