import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials) => {
  /*
  Params:
    credentials.username : The username
    credentials.pwd: The password
  Return:
    token,
    username,
    name
  */
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }