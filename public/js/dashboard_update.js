// update profile info
const updateProfile = async (event) => {
    event.preventDefault();
    
    console.log('hello!');
    const picture = document.querySelector('.profile-picture').value.trim();
    const biography = document.querySelector('.biography').value.trim();
    const userID = window.location.pathname.split('/')[2];
    const response = await fetch(`/api/users/${userID}`, {
        method: 'PUT',
        body: JSON.stringify({ picture, biography }),
        headers: {
            'Content-Type': 'application/json',
        }
        });
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('User not found!');
    }
    };

document
.querySelector('.update-user-form')
.addEventListener('click', updateProfile);