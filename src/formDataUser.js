import { currencyMask, dateMask, emailMask, phoneMask } from "./mask.js";
import postUser from "./qatService.js";

if (document.getElementById('formDataUser')) {
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const birthday = document.getElementById('birthday');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const price = document.getElementById('currency-mask');
    const admissionDate = document.getElementById('admissionDate-mask');
    const notifications = document.getElementById('notifications');
    const saveBtn = document.getElementById('saveBtn');

    phoneMask(phone);
    dateMask(birthday);
    dateMask(admissionDate);
    currencyMask(price);
    emailMask(email);

    if (window?.location?.search) {
        const parameters = new URLSearchParams(window.location.search);
        let inputs = document.forms["userForm"].getElementsByTagName("input");

        Array.from(inputs).forEach((input) => {
            if (parameters.has(input.id))
                input.value = parameters.get(input.id);
        });
    }

    saveBtn.onclick = () => {
        const savebtn = document.getElementById("saveBtn");
        const [admissionDay, admissionMonth, admissionYear] = admissionDate.value.split('/');
        const [birthdayDay, birthdayMonth, birthdayYear] = birthday.value.split('/');
        const admissionDateValue = new Date(admissionYear, admissionMonth, admissionDay);
        const birthdayValue = new Date(birthdayYear, birthdayMonth, birthdayDay);
    
        savebtn.setAttribute("disabled", true)
        postUser({
            firstName: name.value, 
            lastName: surname.value, 
            birthday: !isNaN(birthdayValue.getTime()) ? birthdayValue.toISOString() : null, 
            mail: email.value, 
            phone: phone.value, 
            price: parseFloat(price.value.replace(/[^0-9,]/g,"").replace(",",".")) || 0, 
            admissionDate: !isNaN(admissionDateValue.getTime()) ? admissionDateValue.toISOString() : new Date().toISOString(), 
            notifications: notifications.value == "on", 
            language: 0,
        }).then((response) => {
            savebtn.removeAttribute("disabled", true);
            Swal.fire({
                title: response.ok ? 'Bienvenido!' : 'Error',
                text:  response.ok ? 'Autorizado' : 'No autorizado',
                icon:  response.ok ? 'success' : 'error',
                confirmButtonText: 'OK'
            });
        });
    }
}