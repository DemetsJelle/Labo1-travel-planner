const get = (url) => {
    return fetch(url).then(r => r.json())
    .catch(err => {
        console.error(err);
    });
};

