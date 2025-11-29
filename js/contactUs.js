
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");
let passInput = document.getElementById("password");
let repassInput = document.getElementById("repassword");
let submitBtn = document.getElementById("submitBtn");

let inputs = [nameInput, emailInput, phoneInput, ageInput, passInput, repassInput];

inputs.forEach(inp => {
    inp.addEventListener("input", validateForm);
});

function validateForm() {
    
    let nameValid = /^[a-zA-Z ]+$/.test(nameInput.value);
    let emailValid = /^[\w.-]+@[\w.-]+\.\w+$/.test(emailInput.value);
    let phoneValid = /^01[0-2,5]{1}[0-9]{8}$/.test(phoneInput.value);
    let ageValid = /^(1[89]|[2-9][0-9])$/.test(ageInput.value);
    let passValid = /^[A-Za-z0-9!@#$%^&*]{6,}$/.test(passInput.value);
    let repassValid = (repassInput.value === passInput.value);

     nameError.textContent = nameInput.value === "" ? "" : (nameValid ? "" : "Invalid name");
    emailError.textContent = emailInput.value === "" ? "" : (emailValid ? "" : "Invalid email");
    phoneError.textContent = phoneInput.value === "" ? "" : (phoneValid ? "" : "Invalid phone number");
    ageError.textContent = ageInput.value === "" ? "" : (ageValid ? "" : "Age must be between 18 and 99");
    passError.textContent = passInput.value === "" ? "" : (passValid ? "" : "Password must be at least 6 characters");
    repassError.textContent = repassInput.value === "" ? "" : (repassValid ? "" : "Passwords do not match");

    if (nameValid && emailValid && phoneValid && ageValid && passValid && repassValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
