
import IMask from 'imask';

let inputsDate = [];
let inputscurrency = [];
let momentFormat = '';

export function getMomentFormat() {
    return momentFormat ?? moment.localeData(navigator.language).longDateFormat('L');
}

export function phoneMask(phoneInput) {
    return IMask(
        phoneInput, {
        mask: '+{00} (000) 0000-0000'
        });
}

export function dateMask(dateInput){
    momentFormat = moment.localeData(navigator.language).longDateFormat('L'); 
    dateInput = IMask(
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
    inputsDate.push(dateInput);
    return dateInput;
}

export function currencyMask(currencyInput){
    currencyInput = IMask(
        currencyInput,
        {
            mask: `${navigator.language === 'en' ? '$USD' : '$'} num`,
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: '.',
                    signed: false,
                    max: 999999999999999
                }
            }
        });
    inputscurrency.push(currencyInput)
    return currencyInput;
}

export function emailMask(emailInput){
    return IMask(
        emailInput,
        {
            mask: /^\S*@?\S*$/
        });
}

export function setFormatsByRegion(control, region) {
    control.onclick = () => {
        momentFormat = moment.localeData(region).longDateFormat('L'); 
        
        inputsDate.forEach(input => {
            input.value = '';
            input.updateOptions({
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
        });

        inputscurrency.forEach((input) => input.updateOptions(
            {
                mask: `${region === 'en' ? '$USD' : '$'} num`,
                blocks: {
                    num: {
                        mask: Number,
                        thousandsSeparator: '.',
                        signed: false,
                        max: 999999999999999
                    }
                }
            }
        ))
    }
}