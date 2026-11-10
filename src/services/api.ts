import type { User } from "../types/Type"

const apiUrl = 'https://jsonplaceholder.typicode.com/users'

export const getUsers = async():Promise<User[]> =>{
    const response = await fetch(apiUrl)
 
    if(!response.ok) {
        throw new Error('Failed to fetch users')
    }
    return response.json()
} 

export const createUser = async(user: Omit<User, 'id'>):Promise<User[]> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(user)
    })
    if(!response.ok) {
        throw new Error('Failed to create new user')
    }
    return response.json()
}
