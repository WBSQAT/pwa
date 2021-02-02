
import IMask from 'imask';

var birthdate;
var admissionDate;
const phoneInput = document.getElementById('phone-mask');

if (phoneInput){
    var phoneMask = IMask(
        document.getElementById('phone-mask'), {
        mask: '+{54} (011) 0000-0000'
        });
    
    var momentFormat = moment.localeData(navigator.language).longDateFormat('L'); 
    
    birthdate = IMask(
        document.getElementById('birthdate-mask'),
        {
            mask: Date,
            pattern: momentFormat,
            lazy: false,
            format: function (date) {
                return moment(date).format(momentFormat);
            },
            parse: function (str) {
            return moment(str, momentFormat);
            },
            blocks: {
                YYYY: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 2020
                },
                MM: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12
                },
                DD: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31
                }
            }
        });
    admissionDate = IMask(
        document.getElementById('admissionDate-mask'),
        {
            mask: Date,
            pattern: momentFormat,
            lazy: false,
            format: function (date) {
                return moment(date).format(momentFormat);
            },
            parse: function (str) {
            return moment(str, momentFormat);
            },
            blocks: {
                YYYY: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: new Date().getFullYear()
                },
                MM: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12
                },
                DD: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31
                }
            }
        });
    var currencyMask = IMask(
        document.getElementById('currency-mask'),
        {
            mask: '$num {\\00}',
            blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.'
            }
            }
        });
    var emailMask = IMask(
        document.getElementById('email-mask'),
        {
            mask: /^\S*@?\S*$/
        });
}