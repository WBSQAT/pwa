// const name = document.getElementById('name');
// const surname = document.getElementById('surname');
// const birthdate = document.getElementById('birthdate');
// const email = document.getElementById('email');
// const phone = document.getElementById('phone');
// const price = document.getElementById('price');
// const admissionDate = document.getElementById('admissionDate');
// const notifications = document.getElementById('notifications');

if (window?.location?.search) {
    const parameters = new URLSearchParams(window.location.search);
    let inputs = document.forms["userForm"].getElementsByTagName("input");

    inputs.forEach((input) => {
        if (parameters.has(input.id))
            input.value = parameters.get(input.id);
    });
}