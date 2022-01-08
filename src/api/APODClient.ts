const BASE_APOD_API_URL = "https://api.nasa.gov/planetary/apod";
const APOD_API_KEY = process.env.REACT_APP_APOD_API_KEY || "";

let start_date = new Date();
start_date.setDate(start_date.getDate() - 5);

let end_date = new Date();

interface APODEntry {
    copyright: string;
    date: Date;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

interface APODSearchResultError {
    Success: "False";
    Error: string;
}

interface APODSearchResultSuccess {
    Success: "True";
    Search: APODEntry[];
}

export type APODSearchResult = APODSearchResultError | APODSearchResultSuccess;

function buildAPODQuery(){
    const url = new URL(BASE_APOD_API_URL);
    url.searchParams.set("api_key", APOD_API_KEY);
    url.searchParams.set("start_date", start_date.toISOString().split('T')[0]);
    url.searchParams.set("end_date", end_date.toISOString().split('T')[0]);

    return url.toString();
}

export async function getAPODEntries() {
    try {
        const res = await fetch(buildAPODQuery());
    
        if (res.ok) {
            const result = await res.json();
            result.reverse();

            return result as APODSearchResult;
        } else {
            throw new Error(`Status: ${res.status}: ${res.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error getting APOD entries: ${error}`);
    }
}