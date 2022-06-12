
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/api';

export default axios

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'x-access-token, Origin, Content-Type, Accept';
// axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token';
// axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'OPTIONS,POST,GET';
// axios.defaults.headers.common.crossDomain = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
