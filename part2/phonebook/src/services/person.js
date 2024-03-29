import axios from 'axios'
const baseUrl = '/api/persons'

// Get: Get all person
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

// Post: Create a new person
const createNew = (new_person) => {
    // Ask the db to create data for a new person
    const request = axios.post(baseUrl, new_person)
    return request.then((response) => response.data)
}

// Put: Update a person's info
const updatePerson = (id, new_data) => {
    const request = axios.put(`${baseUrl}/${id}`, new_data)
    return request.then(response => response.data)
}

// Delete: Remove a person from this phonebook
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, createNew, updatePerson, deletePerson}
