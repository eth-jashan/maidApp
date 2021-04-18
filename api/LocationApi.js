import axios from 'axios';

export default axios.create({
    baseURL:'https://api.bigdatacloud.net/data/reverse-geocode-client?'
})
