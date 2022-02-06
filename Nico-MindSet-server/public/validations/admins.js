
const nameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const saveButton = document.getElementById('saveButton');
const errorMessage = document.getElementById('error_massage');

const onFocusInput = () => {
  saveButton.disabled = false;
};

nameInput.onfocus = onFocusInput;
lastNameInput.onfocus = onFocusInput;
usernameInput.onfocus = onFocusInput;
emailInput.onfocus = onFocusInput;
passwordInput.onfocus = onFocusInput;

let ErrName = ErrLastName = ErrUsername = ErrEmail = ErrPassword = "";

const blurName = (event) => {
  let val = event.target.value;
  let ok = true
  for (i=0;i<val.length;i++){
    if(val[i].match(/[a-zA-Z]/g)==null) {
      ok = false;
    }
  }
  ok?ErrName="":ErrName="Name not valid \n";
  errorMessage.innerText = ErrName + ErrLastName + ErrUsername + ErrEmail + ErrPassword;
};

const blurLastName = (event) => {
  let val = event.target.value;
  let ok = true
  for (i=0;i<val.length;i++){
    if(val[i].match(/[a-zA-Z," "]/g)==null) {
      ok = false;
    }
  }
  ok?ErrLastName="":ErrLastName="Last name not valid \n";
  errorMessage.innerText = ErrName + ErrLastName + ErrUsername + ErrEmail + ErrPassword;
};
const blurUsername = (event) => {
  let val = event.target.value;
  let ok = true
  for (i=0;i<val.length;i++){
    if(val[i].match(/[a-zA-Z," ",0-9]/g)==null) {
      ok = false;
    }
  }
  ok?ErrUsername="":ErrUsername="Username not valid \n";
  errorMessage.innerText = ErrName + ErrLastName + ErrUsername + ErrEmail + ErrPassword;
};
const blurEmail = (event) => {
  let val = event.target.value;
  let ok = true
  for (i=0;i<val.length;i++){
    if(val[i].match(/[a-zA-Z," ",@,.,0-9]/g)==null || val.match(/@/g)==null) {
      ok = false;
    }
  }
  ok?ErrEmail="":ErrEmail="Email not valid \n";
  errorMessage.innerText = ErrName + ErrLastName + ErrUsername + ErrEmail + ErrPassword;
};
const blurPassword = (event) => {
  let val = event.target.value;
  let ok = true
  for (i=0;i<val.length;i++){
    if(val.length < 8) {
      ok = false;
    }
  }
  ok?ErrPassword="":ErrPassword="Password is too short \n";
  errorMessage.innerText = ErrName + ErrLastName + ErrUsername + ErrEmail + ErrPassword;
};

nameInput.onblur = blurName;
lastNameInput.onblur = blurLastName;
usernameInput.onblur = blurUsername;
emailInput.onblur = blurEmail;
passwordInput.onblur = blurPassword;

checkingErros = () => {
  if (errorMessage.innerText != ""){
    saveButton.disabled = true;
  }
}
saveButton.onmouseover = checkingErros;