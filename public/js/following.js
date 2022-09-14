const followList = async () => {

    const response = await fetch('/following', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    console.log(response)
    if (response.ok) {
      location.replace('/following');
    } else {
      alert(response.statusText);
    }
  };
  document.querySelector('.follow-list').addEventListener('click', followList);