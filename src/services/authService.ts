import axios from 'axios';

const loginPost = async({email, password}: {email: string, password: string}) => {
  return await axios.post('auth', {email, password});
};

export default loginPost;