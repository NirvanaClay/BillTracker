import axios from 'axios';

// axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
axios.defaults.withCredentials = true;

export default axios;
