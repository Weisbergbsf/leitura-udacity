const api = "http://localhost:3001";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'any-password'
}
//Categories
export const getCategories = () => fetchGetData('categories');

//Posts
export const getPosts = () => fetchGetData('posts');
export const getPostsByCategoria = (category) => fetchGetData(`${category}/posts`);
export const getPost = (postId) => fetchGetData(`posts/${postId}`);
export const createPost = (Post) => fetchData('posts','POST', Post);



const fetchGetData = (url) => {
    return (
        fetch(`${api}/${url}`, { headers })
            .then(res => res.json())
            .then(data => data)
    );
}

const fetchData = (url, method, data) => {
    return (
        fetch(`${api}/${url}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => data)
    );
}

