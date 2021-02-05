
import IMask from 'imask';

export function phoneMask(phoneInput) {
    return IMask(
        phoneInput, {
        mask: '+{00} (000) 0000-0000'
        });
}

export function dateMask(dateInput){
    var momentFormat = moment.localeData(navigator.language).longDateFormat('L'); 

    return IMask(
        dateInput,
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
}

export function currencyMask(currencyInput){
    return IMask(
        currencyInput,
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
}

export function emailMask(emailInput){
    return IMask(
        emailInput,
        {
            mask: /^\S*@?\S*$/
        });
}