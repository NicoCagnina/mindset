window.onload = () => {
    const navButton = document.getElementById('clientsNav');
    navButton.classList.add('activePage');
  
    const customerNameInput = document.getElementById('customerName');
    const branchInput = document.getElementById('branch')
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const descriptionInput = document.getElementById('description');
    const form = document.getElementById('form');
    const saveButton = document.getElementById('saveButton');
    const errorMessage = document.getElementById('errorMessage');
  
    const params = new URLSearchParams(window.location.search);
    saveButton.disabled = !!params.get('clientId');
  
    const onFocusInput = () => {
      errorMessage.innerText = '';
    };
  
    customerNameInput.onfocus = onFocusInput;
    branchInput.onfocus = onFocusInput;
    phoneInput.onfocus = onFocusInput;
    emailInput.onfocus = onFocusInput;
    descriptionInput.onfocus = onFocusInput;
  
    if (params.get('clientId')) {
      fetch(`${window.location.origin}/api/clients/${params.get('clientId')}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          saveButton.disabled = false;
            customerNameInput.value = response.customerName;
            branchInput.value = response.branch;
            phoneInput.value = response.phone;
            emailInput.value = response.email;
            descriptionInput.value = response.description;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        });
    }
  
    form.onsubmit = (event) => {
      event.preventDefault();
      saveButton.disabled = true;
  
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerNameInput.value,
          branch: branchInput.value,
          phone: parseInt(phoneInput.value, 10),
          email: emailInput.value,
          description: descriptionInput.value,
        }),
      };
  
      if (params.get('clientId')) {
        options.method = 'PUT';
        url = `${window.location.origin}/api/clients/${params.get('clientId')}`;
      } else {
        options.method = 'POST';
        url = `${window.location.origin}/api/clients`;
      }
  
      fetch(url, options)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-underscore-dangle
          window.location.href = `${window.location.origin}/views/clientsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        });
    };
  };