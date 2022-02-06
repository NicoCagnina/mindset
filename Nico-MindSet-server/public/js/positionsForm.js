window.onload = () => {
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const clientIdInput = document.getElementById('clientId');
  const jobInput = document.getElementById('job');
  const descriptionInput = document.getElementById('description');
  const input = document.querySelectorAll('input');
  const lettersNumbersSpaces = /^[0-9a-zA-Z]+$/;

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('errorMessage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disables = !!params.get('_id');

  input.forEach((input) => {
    input.addEventListener('focus', () => errorMessage.innerText = '')
  });

  const validateFront = () => {
    console.log(clientIdInput.value)
    if (!clientIdInput.value.match(lettersNumbersSpaces)){
      return false
    }
    if (!jobInput.value.match(lettersNumbersSpaces)){
      return false
    }
    if (!descriptionInput.value.match(lettersNumbersSpaces)){
      return false
    }
    return true
  }

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };
  
  clientIdInput.onfocus = onFocusInput;
  jobInput.onfocus = onFocusInput;
  descriptionInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/positions/${params.get('_id')}`)
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
          clientIdInput.value = response.clientId
          jobInput.value = response.job
          descriptionInput.value = response.description
      })
      .catch((error) => {
        errorMessage.innerText = error;
      });
  };

  form.onsubmit = (event) => {
    event.preventDefault();
    if (validateFront() === true){
      (errorMessage.innerText = '')
      saveButton.disabled = true;
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: clientIdInput.value,
          job: jobInput.value,
          description: descriptionInput.value,
        }),
      };
      if (params.get('_id')) {
        options.method = 'PUT';
        url = `${window.location.origin}/api/positions/${params.get('_id')}`;
      } else {
        options.method = 'POST';
        url = `${window.location.origin}/api/positions`;
      }
      fetch(url, options)
        .then((response) => {
          if (response.status !==200 && response.status!==201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then(() => {
          window.location.href = `${window.location.origin}/views/positionsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        })
    } else {
      errorMessage.innerText = 'Inputs must be filled, with numbers and letters only';
    }
  };
}