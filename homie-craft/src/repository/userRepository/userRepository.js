import axios from 'axios'
import React from 'react'

function userRepository() {
    var userData= axios.get('http://localhost:3003/user').then(res=>res.data)
    var res = await (userData.data)
}

export default userRepository
