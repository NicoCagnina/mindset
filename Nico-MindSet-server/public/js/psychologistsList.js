const openEditForm = (id) => {
  window.location.href = `${window.location.origin}/views/psychologistsForm.html?id=${id}`;
};

const openNewForm = () => {
  window.location.href = `${window.location.origin}/views/psychologistsForm.html`;
};

const deletePsychologist = (id, e) => {
  e.stopPropagation();
  fetch(`${window.location.origin}/api/psychologists/${id}`,{
    method: 'DELETE',
  });
  window.location.reload();
};

window.onload = () => {
  const navButton = document.getElementById("psychologistNav");
  navButton.classList.add("activePage");

  const addButton = document.getElementById("addPsychologist");
  addButton.onclick = openNewForm;

  const tableContent = document.getElementById("table-content");
  fetch(`${window.location.origin}/api/psychologists`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((psychologist) => {
        const tr = document.createElement("tr");
        const firstNameTD = document.createElement("td");
        const lastNameTD = document.createElement("td");
        const usernameTD = document.createElement("td");

        const emailTD = document.createElement("td")
        const actionsTD = document.createElement("td");
        const deleteBtn = document.createElement("button");

        firstNameTD.innerText = psychologist.firstName;
        lastNameTD.innerText = psychologist.lastName
        usernameTD.innerText = psychologist.userName;
        emailTD.innerText = psychologist.email;
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = (e) => deletePsychologist(psychologist._id, e);
        tr.onclick = () => openEditForm(psychologist._id);

        actionsTD.append(deleteBtn);
        tr.append(firstNameTD, lastNameTD, usernameTD, emailTD,actionsTD);
        tableContent.append(tr);
      });
    });
};