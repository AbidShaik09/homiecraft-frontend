const { default: axios } = require("axios")

var baseUrl = 'http://localhost:5265/crafts'

const getAllCrafts = async ()=>{
    var response = await axios.get(baseUrl);
    return response.data
    
}


export {getAllCrafts}