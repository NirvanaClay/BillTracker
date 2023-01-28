console.log("Running bootstrap.js")


window._ = import('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// const axios = await import('axios')
// axios.defaults.withCredentials = true;

// const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

// console.log(csrf_token)
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;


// window.axios = import('axios')

// window.axios.defaults.withCredentials = true;



// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
