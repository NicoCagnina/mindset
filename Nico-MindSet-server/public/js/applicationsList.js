const openEditForm = (id) => {
  window.location.href = `${window.location.origin}/views/applicationsForm.html?id=${id}`;
};

const openNewForm = () => {
  window.location.href = `${window.location.origin}/views/applicationsForm.html`;
};

const deleteApplication = (id, e) => {
  e.stopPropagation();
  fetch(`${window.location.origin}/api/applications/${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

window.onload = () => {
  const navButton = document.getElementById("applicationsNav");
  navButton.classList.add("activePage");

  const addButton = document.getElementById("addApplication");
  addButton.onclick = openNewForm;

  const tableContent = document.getElementById("table-content");
  fetch(`${window.location.origin}/api/applications`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((application) => {
        const tr = document.createElement("tr");
        const jobTD = document.createElement("td");
        const clientTD = document.createElement("td");
        const postulantNameTD = document.createElement("td");

        const resultTD = document.createElement("td");
        const actionsTD = document.createElement("td");
        const deleteBtn = document.createElement("button");

        jobTD.innerText = application.positions?.job || "-";
        clientTD.innerText = application.client.customerName;
        postulantNameTD.innerText = `${application.postulants.firstName} ${application.postulants.lastName}`;
        resultTD.innerText = application.result;
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = (e) => deleteApplication(application._id, e);
        tr.onclick = () => openEditForm(application._id);

        actionsTD.append(deleteBtn);
        tr.append(jobTD, clientTD, postulantNameTD, resultTD, actionsTD);
        tableContent.append(tr);
      });
    });
};
