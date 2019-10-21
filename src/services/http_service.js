import axios from 'axios'

export default class HttpService {
  constructor () {
    this.method = 'get'
    this.url = ''
    this.data = null
    this.headers = {
      'x-api-key': process.env.REACT_APP_API_KEY
    }
    this.params = {}
  }

  static get endpoint () {
    return process.env.REACT_APP_API_ENDPOINT
  }

  get () {
    this.method = 'get'
    return this
  }

  post () {
    this.method = 'post'
    return this
  }

  path (path) {
    this.url = `${HttpService.endpoint}${path}`
    return this
  }

  body (data) {
    this.data = data
    return this
  }

  header (key, value) {
    this.headers[key] = value
    return this
  }

  param (key, value) {
    this.params[key] = value
    return this
  }

  static get (path) {
    return new HttpService().get().path(path)
  }

  static post (path) {
    return new HttpService().post().path(path)
  }

  exec () {
    return axios({
        method: this.method,
        url: this.url,
        data: this.data,
        headers: this.headers,
        params: this.params
    })
  }

  then (handler) {
    return this.exec().then(handler)
  }
}
