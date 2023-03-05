import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://gateway.marvel.com:443/v1/public',
});

apiClient.interceptors.response.use((response) => {
    console.log('API: ', response)
    return response;
    }, 
    (error) => {
        console.log('API ERROR: ', error)
        return Promise.reject(error);
    }
)

const appKey = 'apikey=0e298a0cb8c03559807037b3d3cff261'

const getResource = async (url: string) => {
    try {
        const response = await apiClient.get(url);
    
        if (response.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
    
        return response.data;
        } catch (error) {
            throw error;
        }
    };

const transformCharacter = (char:any) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
}

export { apiClient, getResource, appKey, transformCharacter };