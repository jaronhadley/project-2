// update profile info
const updateProfile = async (event) => {
    event.preventDefault();
    
    const pictureInput = document.querySelector('.profile-picture');
    const biographyInput = document.querySelector('.biography');
    let picture = pictureInput.value.trim();
    let biography = biographyInput.value.trim();
    const userID = window.location.pathname.split('/')[2];

    if (picture === "") {
        picture = pictureInput.getAttribute('data-current');
    }
    if (biography === "") {
        biography = biographyInput.getAttribute('data-current');
    }
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