import axios from "axios"
import { Ant } from "../types/Ant"
import { BASE_API_URL } from "../const/Anthill"

export const getAnthillAnts = async (id: string): Promise<Ant[]> =>{
    try {
        const res = await axios.get<Ant[]>(`${BASE_API_URL}/colony/${id}/getAnts`)

        if(res.status !== 200 || !res.data) throw new Error(`Operation Failed: ${res.statusText}`)

        return res.data;
    } catch(err) {
        throw new Error(`Operation Failed: ${err}`)
    }
}