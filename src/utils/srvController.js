export const srvCons = {
    url: 'https://localhost:3000',
    setURL(newURL) {
        this.url = newURL
    },
    signup(data) {
        return fetch(this.url + '/signup', {method: 'POST', body:data})
    },
    login(data) {
        return fetch(this.url + '/login', data)
    },
    logout(data) {
        return fetch(this.url + '/logout', data)
    },
    sendPicture(data) {
        return fetch(this.url + '/photo', {
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data; boundary=something'
            },
            body: data
        })
    },
    changePicture(data, id) {
        return fetch(this.url + '/photo/' + id, {
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data; boundary=something'
            },
            body: data
        })
    },
    getPicture(data) {
        return fetch(this.url + '/photo')
    },
};