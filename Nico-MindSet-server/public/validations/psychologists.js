window.addEventListener("load", () => {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const userNameInput = document.getElementById("userName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const form = document.getElementById("form");
  const saveButton = document.getElementById("saveButton");
  const errorMessage = document.getElementById("error_massage");

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => (errorMessage.innerText = " "));
  });

  const validateFirstName = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    return firstNameInput.value.match(nameRegex);
  };

  const validateLastName = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    return lastNameInput.value.match(nameRegex);
  };

  const validateUserName = () => {
    const UserNameRegex = /^[a-zA-Z0-9_]*$/;
    return userNameInput.value.match(UserNameRegex);
  };

  const validateEmail = () => {
    const mailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
    return !!email.value.match(mailRegex);
  };

  const validatePassword = () => {
    const passwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return !!password.value.match(passwRegex);
  };

  firstNameInput.onblur = () => {
    validateFirstName()
      ? null
      : (errorMessage.innerText = "First Name must contain only letters");
  };

  lastNameInput.onblur = () => {
    validateLastName()
      ? null
      : (errorMessage.innerText = "Last Name must contain only letters");
  };

  userNameInput.onblur = () => {
    validateUserName()
      ? null
      : (errorMessage.innerText =
          "Username can contain alphanumerical values only");
  };

  emailInput.onblur = () => {
    validateEmail()
      ? null
      : (errorMessage.innerText = "Email format not valid");
  };

  passwordInput.onblur = () => {
    validatePassword()
      ? null
      : (errorMessage.innerText =
          "Password must have 8 characters, one number, one uppercase");
  };

  const validateAll = () => {
    if(validateFirstName() && validateLastName() &&  validateUserName() && validateEmail() && validatePassword()){
      saveButton.disabled = false
    }
    else {saveButton.disabled = true} 
  };
  
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateAll());
  });
});
