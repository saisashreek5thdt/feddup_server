import axios from 'axios'
// let cookie=document.cookie.split(';')
// let token=cookie[4].split('=')
// console.log('coockeeeeeeeeeeee',token[1])
// let Token= localStorage.getItem('access_token')
const Base_Url = `http://159.89.171.252:3030/api/v1/`;




const getInstance = () => {
    return axios.create({
        accept: ' application/json',
        baseURL: Base_Url,
        timeout: 600000,

    });
}



const Instance = () => {
    // console.log('tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',Token)

    return axios.create({
        accept: ' application/json',
        baseURL: Base_Url,
        timeout: 60000,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });
}




const login = (data)=>{
    const instance = getInstance();
    return instance.post(`/login`,data);
}
const signin = (data)=>{
    const instance = getInstance();
    return instance.post(`/signup`,data);
}


export default {
    login,
    signin
}





