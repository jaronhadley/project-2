const followUser = async (event) => {
  let follower_id = event.target.getAttribute('data-id');

  follower_id = parseInt(follower_id);

  const response = await fetch('/profile/:name/follow', {
    method: 'POST',
    body: JSON.stringify({ follower_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.follow-btn').addEventListener('click', followUser);


