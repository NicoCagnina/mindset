window.onload = () => {
    const navButton = document.getElementById('sessionsNav');
    navButton.classList.add('activePage');
  
    const psychologistInput = document.getElementById('psychologyId');
    const postulantInput = document.getElementById('postulantId');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const statInput = document.getElementById('stat');
    const form = document.getElementById('form');
    const saveButton = document.getElementById('saveButton');
    const errorMessage = document.getElementById('errorMessage');
  
    const params = new URLSearchParams(window.location.search);
    saveButton.disabled = !!params.get('sessionId');
  
    const onFocusInput = () => {
      errorMessage.innerText = '';
    };
  
    psychologistInput.onfocus = onFocusInput;
    postulantInput.onfocus = onFocusInput;
    dateInput.onfocus = onFocusInput;
    timeInput.onfocus = onFocusInput;
    statInput.onfocus = onFocusInput;
  
    form.onsubmit = (event) => {
      event.preventDefault();
      saveButton.disabled = true;
  
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          psychology: psychologistInput.value,
          postulant: postulantInput.value,
          date: dateInput.value,
          time: timeInput.value,
          stat: statInput.value
        }),
      };
      options.method = 'POST';
      url = `${window.location.origin}/api/sessions`;
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
          window.location.href = `${window.location.origin}/views/sessionsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        });
    };
  };