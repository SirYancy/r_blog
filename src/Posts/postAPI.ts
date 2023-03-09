import { Post } from './Post';
const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/posts`;

function translateStatusToErrorMessage(status:number){
    switch(status){
        case 401:
            return "Please login again";
        case 403:
            return "You do not have permission to do that.";
        default:
            return "There was an error.";
    }
}

function checkStatus(response: any) {
    if(response.ok){
        return response;
    }else{
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
}

function delay(ms: number){
    return function (x:any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    }
}

function convertToPostModels(data: any[]): Post[] {
    let posts: Post[] = data.map(convertToPostModel);
    return posts;
}

function convertToPostModel(item: any): Post {
    return new Post(item);
}

const postAPI = {
    get(page = 1, limit = 5){
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=publishDate`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToPostModels)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving posts. Please try again.'
                );
            });
    },
    put(post: Post) {
        return fetch(`${url}/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error updating the project. Please try again.'
                );
            });
    },
    find(id: number){
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToPostModel);
    },
}