const api = "http://localhost:3001";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'any-password'
}
//Categories
export const getCategories = () => fetchGetData('categories');

//Posts
export const getPosts = () => fetchGetData('posts');
export const createPost = (post) => fetchData('posts', 'POST', post);
export const deletePost = (post_id) => fetchData(`posts/${post_id}`, 'DELETE');
export const votePost = (post_id, option) => fetchData(`posts/${post_id}`, 'POST', option);
export const getPostById = (post_id) => fetchGetData(`posts/${post_id}`);
export const editPost = (post) => fetchData(`posts/${post.id}`, 'PUT', post);
export const getPostsByCategoria = (category) => fetchGetData(`${category}/posts`);

//Comments
export const getCommnetsByPost = (post_id) => fetchGetData(`posts/${post_id}/comments`);
export const createComment = (comment) => fetchData('comments', 'POST', comment);
export const getCommentById = (comment_id) => fetchGetData(`comments/${comment_id}`);
export const editComment = (comment) => fetchData(`comments/${comment.id}`, 'PUT', comment);
export const deleteComment = (comment_id) => fetchData(`comments/${comment_id}`, 'DELETE');
export const voteComment = (comment_id, option) => fetchData(`comments/${comment_id}`, 'POST', option);


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

