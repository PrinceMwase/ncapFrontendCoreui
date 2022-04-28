import axios from 'axios'

export default function Paginator(response) {
  return {
    next: response.next ? response.next.split(axios.defaults.proxy)[1] : null,
    previous: response.previous ? response.previous.split(axios.defaults.proxy)[1] : null,
  }
}
