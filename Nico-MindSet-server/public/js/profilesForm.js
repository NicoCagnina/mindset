window.onload = () => {
  const navButton = document.getElementById('profilesNav')
  navButton.classList.add('activePage')

  const nameInput = document.getElementById('name')
  const branchInput = document.getElementById('branch')
  const descriptionInput = document.getElementById('description')
 
  const form = document.getElementById('form')
  const saveButton = document.getElementById('saveButton')
  const errorMessage = document.getElementById('error_massage')
  errorMessage.classList.add('error')
  

  const params = new URLSearchParams(window.location.search)
  saveButton.disabled = params.get('_id')
  
  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/profiles/${params.get('_id')}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        saveButton.disabled = false;
        response.forEach((profile) => {
          nameInput.value = profile.profileName
          branchInput.value = profile.branch
          descriptionInput.value = profile.description
        })
      })
      .catch((error) => {
        errorMessage.innerText = error
      })
  }

  form.onsubmit = (event) => {
    event.preventDefault()
    saveButton.disabled = true;
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profileName: nameInput.value,
        branch: branchInput.value,
        description: descriptionInput.value,
      })
    };

    if (params.get('_id')) {
      options.method = 'PUT'
      url = `${window.location.origin}/api/profiles/${params.get('_id')}`
    } else {
      options.method = 'POST'
      url = `${window.location.origin}/api/profiles`
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message)
          });
        }
        return response.json()
      })
      .then(() => {
        window.location.href = `${window.location.origin}/views/profilesList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      })
  }
};