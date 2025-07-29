import axios from "axios"
import { Position } from "../types/Position"
import { BASE_API_URL } from "../const/Anthill"

export const getColonyCoordinates = async (id: string): Promise<Position> =>{
    try {
        const res = await axios.get<Position>(`${BASE_API_URL}/colony/${id}/getColonyPosition`)

        if(res.status !== 200 || !res.data) throw new Error(`Operation Failed: ${res.statusText}`)

        console.log(res.data)
        return res.data;
    } catch(err) {
        throw new Error(`Operation Failed: ${err}`)
    }
}