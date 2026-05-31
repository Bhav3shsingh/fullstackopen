import axios from "axios";

const burl = "http://localhost:3001/persons"

const getData = () => {
    return axios.get(burl);
}

const del = (id) => {
    axios.delete(burl+'/'+id)
}

const update = (obj) => {
    return axios.post(burl,obj).then(response=>response.data).catch(error=>alert("fail"))
}

const neunum = (id,obj) => {
    return axios.put(`${burl}/${id}`,obj)
}

export default {getData, update, del,neunum}
