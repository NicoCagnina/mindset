window.onload = () => {
    const navButton = document.getElementById('adminsNav');
    navButton.classList.add('activePage');
  
    const params = new URLSearchParams(window.location.search);
    saveButton.disabled = !!params.get('adminId');

    if (params.get('adminId')) {
      fetch(`${window.location.origin}/api/admins/${params.get('adminId')}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then((response) => {
            const admin=response;
            nameInput.value = admin.firstName;
            lastNameInput.value = admin.lastName;
            emailInput.value = admin.email;
            usernameInput.value = admin.username;
            passwordInput.value = admin.password; 
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
          firstName: nameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          username: usernameInput.value,
          password: passwordInput.value  
        }),
      };
      if (params.get('adminId')) {
        options.method = 'PUT';
        url = `${window.location.origin}/api/admins/${params.get('adminId')}`;
      } else {
        options.method = 'POST';
        url = `${window.location.origin}/api/admins`;
      }
  
      fetch(url, options)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-underscore-dangle
          window.location.href = `${window.location.origin}/views/adminsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        });
    };
  };