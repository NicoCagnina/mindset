window.onload = () => {
  const openEditadminForm = (admin) => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/adminsForm.html?adminId=${admin._id}`;
  };
  
  const openNewadminForm = () => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/adminsForm.html`;
  };
  
  const deleteAdmin = (id,event) => {
    event.stopPropagation();
    const url = `${window.location.origin}/api/admins/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status != 200) {
        return response.json().then(({ ErrMessage }) => {
          throw new Error(ErrMessage);
        });
      }
      return response.json();
    })
    window.location.reload();
  }
  
  const navButton = document.getElementById('adminsNav');
  navButton.classList.add('activePage');

  const addadminButton = document.getElementById('addAdmin');
  addadminButton.onclick = openNewadminForm;

  const tableContent = document.getElementById('table-content');
 
  fetch(`${window.location.origin}/api/admins`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((admin) => {
        const tr = document.createElement('tr');
        const nameTD = document.createElement('td');
        const lastNameTD = document.createElement('td');
        const usernameTD = document.createElement('td');
        const emailTD = document.createElement('td');
        const passwordTD = document.createElement('td');
        const deleteTD = document.createElement('td');
        nameTD.innerText = admin.firstName;
        lastNameTD.innerText = admin.lastName;
        usernameTD.innerText = admin.username;
        emailTD.innerText = admin.email;
        passwordTD.innerText = admin.password;
        const deleteButton = document.createElement('button');
        deleteTD.append(deleteButton);
        deleteButton.innerText = "\u274C";
        deleteButton.onclick = (event) => deleteAdmin(admin._id, event)
        tr.onclick = () => openEditadminForm(admin);
        tr.append(nameTD, lastNameTD, usernameTD, emailTD, passwordTD, deleteTD);
        tableContent.append(tr);
      });
    });
}