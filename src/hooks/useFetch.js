import { useEffect, useState, useCallback } from "react"

export const useFetch = (url) => { 
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = useCallback( async () => {
        setLoading(true)
        
        try {
            const response = await fetch(url)
            if(!response.ok){
                throw new Error('Error fetching data')
            }
            const res = await response.json()
            setData(res)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        getData()
    }, [getData])

    return {data, loading, error}
}