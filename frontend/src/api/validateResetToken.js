import axios from 'axios';

export default (resetToken) => {
	axios.post(process.env.REACT_APP_API + '/validateResetToken', resetToken)
		.then(res => {
			localStorage.clear();
			console.log(res.msg);
			if (res.status === 200) {
				console.log('true');
				return true;
			}
			else {
				console.log('false');
				return false;
			}
		});
};