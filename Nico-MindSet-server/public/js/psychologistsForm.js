window.addEventListener("load", () => {
  const navButton = document.getElementById("psychologistNav");
  navButton.classList.add("activePage");

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const userNameInput = document.getElementById("userName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const form = document.getElementById("form");
  const saveButton = document.getElementById("saveButton");
  const errorMessage = document.getElementById("error_massage");

  const params = new URLSearchParams(window.location.search);

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => errorMessage.innerText = " ");
  });
  
  if (params.get("id")) {
    fetch(`${window.location.origin}/api/psychologists/${params.get("id")}`)
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

        firstNameInput.value = response.firstName;
        lastNameInput.value = response.lastName;
        userNameInput.value = response.userName;
        emailInput.value = response.email;
        passwordInput.value = response.password;
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        userName: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      }),
    };

    if (params.get("id")) {
      options.method = "PUT";
      url = `${window.location.origin}/api/psychologists/${params.get("id")}`;
    } else {
      options.method = "POST";
      url = `${window.location.origin}/api/psychologists`;
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
        window.location.href = `${window.location.origin}/views/psychologistsList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
})
