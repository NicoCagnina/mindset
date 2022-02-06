window.addEventListener('load', () => {
  const navButton = document.getElementById('postulantsNav');
  navButton.classList.add('activePage');

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const userNameInput = document.getElementById('userName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const birthDateInput = document.getElementById('birthDate');
  const streetInput = document.getElementById('street');
  const streetNumberInput = document.getElementById('streetNumber');
  const postalCodeInput = document.getElementById('postalCode');
  const cityInput = document.getElementById('city');
  const provinceInput = document.getElementById('province');
  const countryInput = document.getElementById('country');
  const telephoneInput = document.getElementById('telephone');
  const jobPositionInput = document.getElementById('jobPosition');
  const employerInput = document.getElementById('employer');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const descriptionInput = document.getElementById('description');
  const input = document.querySelectorAll('input');
  const justLettersNumbers = /^[0-9a-zA-Z]+$/;
  const justNumbers = /^[0-9]+$/;
  const justLetters = /^[a-zA-Z\s]+$/;
  const justDate = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('errorMessage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disables = !!params.get('_id');

  input.forEach((input) => {
    input.addEventListener('focus', () => errorMessage.innerText = '')
  });

  const validateFront = () => {
    if (!firstNameInput.value.match(justLetters)){
      return errorMessage.innerText = 'First name must be filled with letters only';
    }
    if (!lastNameInput.value.match(justLetters)){
      return errorMessage.innerText = 'Last name must be filled with letters only';
    }
    if (!userNameInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'User name must be filled with letters and numbers only';
    }
    if (!passwordInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'Password must be filled with letters and numbers only';
    }
    if (!birthDateInput.value.match(justDate)){
      return errorMessage.innerText = 'Dates must be filled in DD-MM-YYYY format';
    }
    if (!streetInput.value.match(justLetters)){
      return errorMessage.innerText = 'Street must be filled with letters only';
    }
    if (!streetNumberInput.value.match(justNumbers)){
      return errorMessage.innerText = 'Street number must be filled with numbers only';
    }
    if (!postalCodeInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'Postal code must be filled with numbers and letters only';
    }
    if (!cityInput.value.match(justLetters)){
      return errorMessage.innerText = 'City must be filled with letters only';
    }
    if (!provinceInput.value.match(justLetters)){
      return errorMessage.innerText = 'Province must be filled with letters only';
    }
    if (!countryInput.value.match(justLetters)){
      return errorMessage.innerText = 'Country must be filled with letters only';
    }
    if (!telephoneInput.value.match(justNumbers)){
      return errorMessage.innerText = 'Telephone number must be filled with numbers only';
    }
    if (!jobPositionInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'Job Position must be filled with numbers and letters only';
    }
    if (!employerInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'Employer must be filled with numbers and letters only';
    }
    if (!startDateInput.value.match(justDate)){
      return errorMessage.innerText = 'Dates must be filled in DD-MM-YYYY format';
    }
    if (!endDateInput.value.match(justDate)){
      return errorMessage.innerText = 'Dates must be filled in DD-MM-YYYY format';
    }
    if (!descriptionInput.value.match(justLettersNumbers)){
      return errorMessage.innerText = 'Description must be filled with letters and numbers only';
    }
    return true
  }

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };
  
  firstNameInput.onfocus = onFocusInput;
  lastNameInput.onfocus = onFocusInput;
  userNameInput.onfocus = onFocusInput;
  passwordInput.onfocus = onFocusInput;
  birthDateInput.onfocus = onFocusInput;
  streetInput.onfocus = onFocusInput;
  streetNumberInput.onfocus = onFocusInput;
  postalCodeInput.onfocus = onFocusInput;
  cityInput.onfocus = onFocusInput;
  provinceInput.onfocus = onFocusInput;
  countryInput.onfocus = onFocusInput;
  telephoneInput.onfocus = onFocusInput;
  jobPositionInput.onfocus = onFocusInput;
  employerInput.onfocus = onFocusInput;
  startDateInput.onfocus = onFocusInput;
  endDateInput.onfocus = onFocusInput;
  descriptionInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/postulants/${params.get('_id')}`)
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
        firstNameInput.value = response.firstName
        lastNameInput.value = response.lastName
        userNameInput.value = response.userName
        emailInput.value = response.email
        passwordInput.value = response.password
        birthDateInput.value = response.birthDate
        streetInput.value = response.street
        streetNumberInput.value = response.streetNumber
        postalCodeInput.value = response.postalCode
        cityInput.value = response.city
        provinceInput.value = response.province
        countryInput.value = response.country
        telephoneInput.value = response.telephone
        response.experience.forEach((experience) => {
          jobPositionInput.value = experience.jobPosition
          employerInput.value = experience.employer
          startDateInput.value = experience.startDate
          endDateInput.value = experience.endDate
          descriptionInput.value = experience.description
        });
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
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          userName: userNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          birthDate: birthDateInput.value,
          street: streetInput.value,
          streetNumber: streetNumberInput.value,
          postalCode: postalCodeInput.value,
          city: cityInput.value,
          province: provinceInput.value,
          country: countryInput.value,
          telephone: parseInt(telephoneInput.value),
          experience: {
            jobPosition: jobPositionInput.value,
            employer: employerInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            description: descriptionInput.value,
          },
        }),
      };
      if (params.get('_id')) {
        options.method = 'PUT';
        url = `${window.location.origin}/api/postulants/${params.get('_id')}`;
      } else {
        options.method = 'POST';
        url = `${window.location.origin}/api/postulants`;
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
          window.location.href = `${window.location.origin}/views/postulantsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        })
      } else {
        errorMessage
    }
  };
})