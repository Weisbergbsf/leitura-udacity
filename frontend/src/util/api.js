const api = "http://localhost:3001";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'any-password'
}
//Categories
export const getCategories = () => fetchGetData('categories');//ok

//Posts
export const getPosts = () => fetchGetData('posts');//ok
export const createPost = (post) => fetchData('posts', 'POST', post);//ok
export const deletePost = (post_id) => fetchData(`posts/${post_id}`, 'DELETE');//ok
export const votePost = (post_id, option) => fetchData(`posts/${post_id}`, 'POST', option);//ok
export const getPostById = (post_id) => fetchGetData(`posts/${post_id}`);//ok
export const editPost = (post) => fetchData(`posts/${post.id}`, 'PUT', post);//ok

export const getPostsByCategoria = (category) => fetchGetData(`${category}/posts`);


//Comments
export const getCommnetsByPost = (post_id) => fetchGetData(`posts/${post_id}/comments`);//ok
export const createComment = (comment) => fetchData('comments', 'POST', comment);//ok

export const getCommentById = (comment_id) => fetchGetData(`comments/${comment_id}`);//ok

export const editComment = (comment) => fetchData(`comments/${comment.id}`, 'PUT', comment);//ok

export const deleteComment = (comment_id) => fetchData(`comments/${comment_id}`, 'DELETE'); // ok

export const voteComment = (comment_id, option) => fetchData(`comment/${comment_id}`, 'POST', option)


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

