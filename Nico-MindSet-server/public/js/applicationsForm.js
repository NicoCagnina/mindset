window.addEventListener("load", () => {
  const navButton = document.getElementById("applicationsNav");
  navButton.classList.add("activePage");

  const positionInput = document.getElementById("job");
  const clientInput = document.getElementById("client");
  const postulantInput = document.getElementById("postulant");
  const resultInput = document.getElementById("result");

  const form = document.getElementById("form");
  const saveButton = document.getElementById("saveButton");
  const errorMessage = document.getElementById("error_massage");

  const params = new URLSearchParams(window.location.search);
  saveButton.disabled = !!params.get("id");

  const onFocusInput = () => {
    errorMessage.innerText = "";
  };

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    addEventListener("focus", onFocusInput);
  });

  if (params.get("id")) {
    fetch(`${window.location.origin}/api/applications/${params.get("id")}`)
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

        positionInput.value = response.positions._id;
        clientInput.value = response.client._id;
        postulantInput.value = response.postulants._id;
        resultInput.value = response.result;
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
        positions: positionInput.value,
        client: clientInput.value,
        postulants: postulantInput.value,
        result: resultInput.value
      }),
    };

    if (params.get("id")) {
      options.method = "PUT";
      url = `${window.location.origin}/api/applications/${params.get("id")}`;
    } else {
      options.method = "POST";
      url = `${window.location.origin}/api/applications`;
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
        window.location.href = `${window.location.origin}/views/applicationsList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      });
  };
});
