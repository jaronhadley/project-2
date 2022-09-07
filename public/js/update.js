// update post
const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const contents = document.querySelector('#post-cont').value.trim();

  const post_id = window.location.pathname.split('/')[3];
  if (title && contents) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, contents }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to update post');
    }
  }
};
// add tag
const addTag = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const post_id = window.location.pathname.split('/')[3];
  const tag_name = document.querySelector('#tag').value.trim();

  if(tag_name){
    const response = await fetch('/api/tags/',{
      method:'POST',
      body: JSON.stringify({ tag_name, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/post/update/${post_id}`);
    } else {
      alert('Failed to add tag');
    }
  }
};
// delete tag
const deleteTag = async (event) => {
  const post_id = window.location.pathname.split('/')[3];
  const tag_id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/tags/${post_id}/${tag_id}`,{
    method:'DELETE',
  });
  if (response.ok) {
    document.location.replace(`/post/update/${post_id}`);
  } else {
    alert('Failed to delete post');
  }
};
document.querySelector('.new-post-form').addEventListener('submit', updatePost);
document.querySelector('.tag-form').addEventListener('click', addTag);
document.querySelector('.tag-delete').addEventListener('click', deleteTag);
