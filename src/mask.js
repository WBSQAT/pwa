
import IMask from 'imask';

var birthday;
var admissionDate;
const phoneInput = document.getElementById('phone');

if (phoneInput){
    var phoneMask = IMask(
        document.getElementById('phone'), {
        mask: '+{00} (000) 0000-0000'
        });
    
    var momentFormat = moment.localeData(navigator.language).longDateFormat('L'); 
    
    birthday = IMask(
        document.getElementById('birthday'),
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
            mask: '$num',
            blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                signed: false,
                max: 999999999999999
            }
            }
        });
    var emailMask = IMask(
        document.getElementById('email'),
        {
            mask: /^\S*@?\S*$/
        });
}