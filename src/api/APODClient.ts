const BASE_APOD_API_URL = 'https://api.nasa.gov/planetary/apod';
const APOD_API_KEY = process.env.REACT_APP_APOD_API_KEY || '';

let start_date = new Date();
start_date.setDate(start_date.getDate() - 4);

let end_date = new Date();

export interface APODEntry {
    date: string;
    explanation: string;
    media_type: "image" | "video";
    service_version: string;
    title: string;
    url: string;
    hdurl: string;
}

function buildAPODQuery(){
    const url = new URL(BASE_APOD_API_URL);
    url.searchParams.set('api_key', APOD_API_KEY);
    url.searchParams.set('start_date', start_date.toISOString().split('T')[0]);
    url.searchParams.set('end_date', end_date.toISOString().split('T')[0]);

    start_date.setDate(start_date.getDate() - 5);
    end_date.setDate(end_date.getDate() - 5);

    return url.toString();
}

export async function getAPODEntries() {
    try {
        const res = await fetch(buildAPODQuery());
    
        if (res.ok) {
            const result = await res.json();
            result.reverse();

            return result as APODEntry[];
        } else {
            throw new Error(`Status: ${res.status}: ${res.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error getting APOD entries: ${error}`);
    }
}