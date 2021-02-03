const apiUrl = "https://qat.azurewebsites.net/api"

export default function postUser({ firstName, lastName, birthday, mail, phone, price, admissionDate, notifications, language }) {
    return fetch(`${apiUrl}/user`, {
        method: 'POST',
        body: JSON.stringify({
            "ID": 0,
            "EmployeeNumber": "",
            "Mail": mail,
            "FirstName": firstName,
            "LastName": lastName,
            "Birthdate": birthday,
            "Key": "",
            "Phone": phone,
            "Price": price,
            "AdmissionDate": admissionDate,
            "Notifications": notifications,
            "Language": language,
            "NomUsuario": "",
            "PassUsuario": ""
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
} 