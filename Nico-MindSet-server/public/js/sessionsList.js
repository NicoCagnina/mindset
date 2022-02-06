const openEditSessionForm = (session) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionsForm.html?sessionId=${session._id}`;
};

const openNewSessionForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionsForm.html`;
};

const deleteSession = (id, event) => {
  // eslint-disable-next-line no-underscore-dangle
  event.stopPropagation();
  const url = `${window.location.origin}/api/sessions/${id}`
  fetch(url, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response);
      } else {
        window.location.reload()
      }
    })
    .catch((error => error));
};

window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const addSessionButton = document.getElementById('addSession');
  addSessionButton.onclick = openNewSessionForm;

  const tableContent = document.getElementById('table-content');
  fetch(`${window.location.origin}/api/sessions`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((sessions) => {
        const tr = document.createElement('tr');
        const psychologistTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const dateTD = document.createElement('td');
        const timeTD = document.createElement('td');
        const statusTD = document.createElement('td');
        const actionTD = document.createElement('td');
        psychologistTD.innerText = `${sessions.psychology?.firstName} ${sessions.psychology?.lastName}`;
        postulantTD.innerText = `${sessions.postulant?.firstName} ${sessions.postulant?.lastName}`;
        dateTD.innerText = sessions.date;
        timeTD.innerText = sessions.time;
        statusTD.innerText = sessions.stat;
        const button = document.createElement('button');
        button.innerText = 'Delete';
        actionTD.append(button);
        tr.onclick = () => openEditSessionForm(sessions);
        tr.append(psychologistTD, postulantTD, dateTD, timeTD, statusTD, actionTD, actionTD);
        tableContent.append(tr);
        button.onclick = (event) => {
          event.stopPropagation()
          deleteSession(sessions._id, event);
        }
      });
    });
};
