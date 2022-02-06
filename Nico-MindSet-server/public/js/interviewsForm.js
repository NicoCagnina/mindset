const exp=/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])$/

window.onload = () => {
  const navButton = document.getElementById('interviewsNav')
  navButton.classList.add('activePage')

  const positionInput = document.getElementById('position')
  const postulantInput = document.getElementById('postulant')
  const dateInput = document.getElementById('date')
  const statusInput = document.getElementById('status')
  const form = document.getElementById('form')
  const saveButton = document.getElementById('saveButton')
  const errorMessage = document.getElementById('error_massage')
  const errorStatus=document.getElementById('errorStatus')
  const errorDate=document.getElementById('errorDate')
  errorDate.classList.add('error')
  errorMessage.classList.add('error')
  errorStatus.classList.add('error')

  const params = new URLSearchParams(window.location.search)
  saveButton.disabled = params.get('_id')

  validateStatus= () => {
    if(statusInput.value != 'cancelled' && statusInput.value != 'next step' && statusInput.value != 'pending' && statusInput.value != 'finished'){
      errorStatus.innerText ='The possible status are pending, cancelled, next step and finished'
      return true
    }
    else{
      return false
    }
  }
  validateDate= () => {
    if( !exp.test(dateInput.value)){
      errorDate.innerText ='The date must be in the format dd/mm/yyyy and hh:mm'
      return true
    }
    else{
      return false
    }
  }

  dateInput.onblur = validateDate
  statusInput.onblur = validateStatus
  dateInput.onfocus = ()=> {
    errorDate.innerText=''
  }
  statusInput.onfocus = ()=> {
    errorStatus.innerText=''
  }
  
  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/interviews/${params.get('_id')}`)
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
        response.forEach((interview) => {
          postulantInput.value = interview.postulantId
          positionInput.value = interview.positionId
          dateInput.value = interview.dateTime
          statusInput.value = interview.status
        })
      })
      .catch((error) => {
        errorMessage.innerText = error
      })
  }

  form.onsubmit = (event) => {
    event.preventDefault()
    if (!validateDate() && !validateStatus()){
      saveButton.disabled = true;
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positionId: positionInput.value,
          postulantId: postulantInput.value,
          dateTime: dateInput.value,
          status: statusInput.value,
        })
      };

      if (params.get('_id')) {
        options.method = 'PUT'
        url = `${window.location.origin}/api/interviews/${params.get('_id')}`
      } else {
        options.method = 'POST'
        url = `${window.location.origin}/api/interviews`
      }

      fetch(url, options)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message)
            });
          }
          return response.json()
        })
        .then(() => {
          window.location.href = `${window.location.origin}/views/interviewsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        })
    }
  }
};