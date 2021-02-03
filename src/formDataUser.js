import postUser from "./qatService.js";

const name = document.getElementById('name');
const surname = document.getElementById('surname');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const price = document.getElementById('currency-mask');
const admissionDate = document.getElementById('admissionDate-mask');
const notifications = document.getElementById('notifications');
const saveBtn = document.getElementById('saveBtn');

if (window?.location?.search) {
    const parameters = new URLSearchParams(window.location.search);
    let inputs = document.forms["userForm"].getElementsByTagName("input");

    Array.from(inputs).forEach((input) => {
        if (parameters.has(input.id))
            input.value = parameters.get(input.id);
    });
}

if (saveBtn) {
    saveBtn.onclick = () => {
        const [admissionDay, admissionMonth, admissionYear] = admissionDate.value.split('/');
        const [birthdayDay, birthdayMonth, birthdayYear] = birthday.value.split('/');
        const admissionDateValue = new Date(admissionYear, admissionMonth, admissionDay);
        const birthdayValue = new Date(birthdayYear, birthdayMonth, birthdayDay);
    
        postUser({
            firstName: name.value, 
            lastName: surname.value, 
            birthday: !isNaN(birthdayValue.getTime()) ? birthdayValue.toISOString() : null, 
            mail: email.value, 
            phone: phone.value, 
            price: parseFloat(price.value) || 0, 
            admissionDate: !isNaN(admissionDateValue.getTime()) ? admissionDateValue.toISOString() : new Date().toISOString(), 
            notifications: !!notifications.value, 
            language: 0,
        }).then((response) => {
            Swal.fire({
                title: response.ok ? 'Bienvenido!' : 'Error',
                text:  response.ok ? 'Autorizado' : 'No autorizado',
                icon:  response.ok ? 'success' : 'error',
                confirmButtonText: 'OK'
            });
        });
    }
}