const openEditProfileForm = (id) => {
  window.location.href = `${window.location.origin}/views/profilesForm.html?_id=${id}`
};

const openNewProfileForm = () => {
  window.location.href = `${window.location.origin}/views/profilesForm.html`
};

const deleteProfile = (id) => {
  const options = {
    method: "DELETE"
  };
  url = `${window.location.origin}/api/profiles/${id}`
  fetch(url,options)
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message)
        })
      }
    })
    .then(() => {
      window.location.href = `${window.location.origin}/views/profilesList.html`;
    })
    .catch((error) => {
      console.log(error)
    })
}

window.onload = () => {
  const navButton = document.getElementById('profilesNav')
  navButton.classList.add('activePage')

  const addProfileButton = document.getElementById('addProfile')
  addProfileButton.onclick = openNewProfileForm

  const tableContent = document.getElementById('profiles-table')
  fetch(`${window.location.origin}/api/profiles`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((profile) => {
        const tr = document.createElement('tr')
        const nameTD = document.createElement('td')
        const branchTD = document.createElement('td')
        const descriptionTD = document.createElement('td')
        const actionsTD = document.createElement('td')
        const button = document.createElement('button')
        nameTD.innerText = profile.profileName
        branchTD.innerText = profile.branch
        descriptionTD.innerText = profile.description
        button.innerText="Delete"
        actionsTD.append(button)
        tr.onclick = () => openEditProfileForm(profile._id)
        tr.append(nameTD, branchTD, descriptionTD, actionsTD)
        tableContent.append(tr)  
        button.onclick=(event)=>{
          event.stopPropagation()
          deleteProfile(profile._id)
        }
      })
    })
    .catch((error)=>{
      console.log(error)
    })
}