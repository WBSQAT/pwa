import { currencyMask, dateMask, emailMask, phoneMask, setFormatsByRegion, getMomentFormat } from "./mask.js";
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
    const setterEs = document.getElementById('setterEs');
    const setterEn = document.getElementById('setterEn');
    const saveBtn = document.getElementById('saveBtn');

    phoneMask(phone);
    dateMask(birthday);
    dateMask(admissionDate);
    currencyMask(price);
    emailMask(email);
    setFormatsByRegion(setterEs, 'es');
    setFormatsByRegion(setterEn, 'en');

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
    
        savebtn.setAttribute("disabled", true)
        postUser({
            firstName: name.value, 
            lastName: surname.value, 
            birthday: moment(birthday.value, getMomentFormat()).toISOString() || null, 
            mail: email.value, 
            phone: phone.value, 
            price: parseFloat(price.value.replace(/[^0-9,]/g,"").replace(",",".")) || 0, 
            admissionDate: moment(admissionDate.value, getMomentFormat()).toISOString() || null, 
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