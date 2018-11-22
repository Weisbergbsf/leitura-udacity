const api = "http://localhost:3001";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'any-password'
}
//Categories
export const getCategories = () => fetchGetData('categories');//ok

//Posts
export const getPosts = () => fetchGetData('posts');//ok
export const getPostsByCategoria = (category) => fetchGetData(`${category}/posts`);//ok
export const createPost = (post) => fetchData('posts', 'POST', post);//ok
export const deletePost = (post_id) => fetchData(`posts/${post_id}`, 'DELETE');//ok
export const votePost = (post_id, option) => fetchData(`posts/${post_id}`, 'POST', option);//ok
export const getPost = (post_id) => fetchGetData(`posts/${post_id}`);

export const editPost = (post) => fetchData(`posts/${post}`, 'PUT', post);


//Comments
export const getCommnetsByPost = (post) => fetchGetData(`posts/${post}/comments`);
export const getComment = (comment) => fetchGetData(`comments/${comment}`);
export const createComment = (comment) => fetchData('comments', 'POST', comment);
export const editc = (comment) => fetchGetData(`comments/${comment}`, 'PUT', comment);
export const deleteComcent = (comment) => fetchData(`comments/${comment}`, 'DELETE');
export const voteComment = (comment, option) => fetchData(`comment/${comment}`, 'POST', option)


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

