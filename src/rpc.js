const
    prefix = '/theatersoft',
    url = location.origin + prefix

export default function request (method, args = [], host) {
    return new Promise((resolve, reject) => {
        const
            xhr = new XMLHttpRequest()
        xhr.open('POST', url + '/rpc', true)
        xhr.withCredentials = true
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var r = JSON.parse(this.responseText)
                    if (r.error) {
                        console.log(method, 'failed', this.status)
                        reject(r.error)
                    } else
                        resolve(r.result)
                } else {
                    console.log(method, 'failed', this.status)
                    reject(this.status)
                }
            }
        }
        xhr.send(JSON.stringify({method, args, host}))
    })
}
