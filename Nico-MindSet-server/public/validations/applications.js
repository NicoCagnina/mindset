window.addEventListener("load", () => {
  const positionInput = document.getElementById("job");
  const clientInput = document.getElementById("client");
  const postulantInput = document.getElementById("postulant");
  const resultInput = document.getElementById("result");


  const form = document.getElementById("form");
  const saveButton = document.getElementById("saveButton");
  const errorMessage = document.getElementById("error_massage");

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => (errorMessage.innerText = " "));
  });

  const validatePosition = () => {
    const positionRegex = /^[a-zA-Z0-9_]{24}$/;
    return positionInput.value.match(positionRegex);
  };

  const validateClient = () => {
    const clientRegex = /^[a-zA-Z0-9_]{24}$/;
    return clientInput.value.match(clientRegex);
  };

  const validatePostulant = () => {
    const postulantRegex = /^[a-zA-Z0-9_]{24}$/;
    return postulantInput.value.match(postulantRegex);
  };

  const validateResult = () => {
    const resultRegex =
    /\b(approved|declined|pending)\b/gm;
    return !!resultInput.value.match(resultRegex);
  };

  positionInput.onblur = () => {
    validatePosition()
      ? null
      : (errorMessage.innerText = "PositionId must contain an alphanumerical Id of 24 characters");
  };

  clientInput.onblur = () => {
    validateClient()
      ? null
      : (errorMessage.innerText = "ClientId must contain an alphanumerical Id of 24 characters");
  };

  postulantInput.onblur = () => {
    validatePostulant()
      ? null
      : (errorMessage.innerText =
          "PostulantId must contain an alphanumerical Id of 24 characters");
  };

  resultInput.onblur = () => {
    validateResult()
      ? null
      : (errorMessage.innerText = "Results status accepted: approved | eclined | pending");
  };


  const validateAll = () => {
    if(validatePosition() && validateClient() &&  validatePostulant() && validateResult()){
      saveButton.disabled = false
    }
    else {saveButton.disabled = true} 
  };

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateAll());
  });
});