const openEditClientForm = (client) => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/clientsForm.html?clientId=${client._id}`;
  };
  
  const openNewClientForm = () => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/clientsForm.html`;
  };

  const deleteClient = (id, event) => {
    // eslint-disable-next-line no-underscore-dangle
    event.stopPropagation();
    const url = `${window.location.origin}/api/clients/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status != 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    })
    window.location.reload()
    .catch((error => error));
  };
  
  window.onload = () => {
    const navButton = document.getElementById('clientsNav');
    navButton.classList.add('activePage');
  
    const addClientButton = document.getElementById('addClient');
    addClientButton.onclick = openNewClientForm;
  
    const tableContent = document.getElementById('table-content');
    fetch(`${window.location.origin}/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        response.forEach((clients) => {
          const tr = document.createElement('tr');
          const NameTD = document.createElement('td');
          const phoneTD = document.createElement('td');
          const emailTD = document.createElement('td');
          const actionTD = document.createElement('td');
          NameTD.innerText = clients.customerName;
          phoneTD.innerText = clients.phone;
          emailTD.innerText = clients.email;
          const button = document.createElement('button');
          button.innerText = 'Delete';
          actionTD.append(button);
          tr.onclick = () => openEditClientForm(clients);
          tr.append(NameTD, phoneTD, emailTD, actionTD);
          tableContent.append(tr);
          button.onclick = (event) => {
            event.stopPropagation()
            deleteClient(clients._id, event);
          }
        });
      });
  };