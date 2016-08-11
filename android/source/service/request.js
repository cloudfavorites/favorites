import Config from '../config';

const apiDomain = Config.domain;
const timeout = 15000;

function filterJSON(res) {
	try{
		return res.text();	
	}
	catch(e){
		throw new Error('data format error');
	}
	
}

function filterStatus(res) {
	if (res.ok) {
		return res;
	} else {
		throw new Error('server handle error');
	}
}

function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("fetch time out"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  })
}

export function get(url, params) {
	url = apiDomain + url;

	if (__DEV__){
		console.log('fetch data: ' + url);
  }

	return timeoutFetch(timeout, fetch(url))
	.then(filterStatus)
	.then(filterJSON)
	.catch(function(error) {
	  	throw error;
	});
}

export function post(url, body) {
	url = apiDomain + url;

	return timeoutFetch(timeout, fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}))
	.then(filterStatus)
	.then(filterJSON)
	.catch(function(error) {
	  	throw error;
	});	
}