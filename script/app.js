'use strict'
const submitBtn = document.querySelector('#form_button')
const passEye = document.querySelector('.fa-eye');
const nameInput = document.querySelector('#user_name')
const passInput = document.querySelector('#user_pass')
const countryInput = document.querySelector('#user_country');
const userTerms = document.querySelector('#user_terms');
const userTermsLabel = document.querySelector('#user_terms__label');

const termsChecker = elem => {    
    if (!elem.checked) {
        userTermsLabel.classList.add('user_terms__no-checked')
    }
    elem.addEventListener('click', () => {
        userTermsLabel.classList.remove('user_terms__no-checked')
    })
}

let passReg = new RegExp('(?=.*[A-Z])(?=.*[a-z])(?=.*[a-z])(?=.*[1-9]).{8,}')
let passRegBigLetter = new RegExp ('(?=.*[A-Z])');
let passRegSmallLetter = new RegExp ('(?=.*[a-z])');
let passRegNumber = new RegExp ('(?=.*[1-9])');
let passRegLength = new RegExp ('.{8,}');
let nameReg = new RegExp ('(?=.*[a-z]).{3,}');
let countryReg = /[^Country]/;


function requiredMessageConstuctor (element, elementPadding, messageInnerHTML, messageClass) {    
    element.closest('div').style.paddingBottom = `${elementPadding}`
    let validationMessage = document.createElement('span');
    validationMessage.classList.add('validation-message');
    validationMessage.innerHTML = `${messageInnerHTML}`
    element.closest('div').append(validationMessage);
    element.closest('div').classList.add(`${messageClass}`);
}

function validationCheck (item, validator) {
    if (validator.test(item.value)) {
        item.closest('div').lastChild.innerHTML = '';
        item.closest('div').style.paddingBottom = '';
        item.closest('div').classList.remove('required_field');
        console.log(item.closest('div').lastElementChild.classList.value);
        return validator.test(item.value)        
    } else {
        if (item.closest('div').lastElementChild.classList.value !== 'validation-message') {
            console.log(item.closest('div').lastElementChild.classList.value);
            if (item.id === 'user_name') {
                requiredMessageConstuctor(item, '', `Minimum 3 letters`, 'required_field')
            }
            if (item.id === 'user_pass') {
                    requiredMessageConstuctor(item, '32px', `<ul class="pass-field_list">
                                                                <li class="passRegBigLetter">1 uppercase</li>
                                                                <li class="passRegSmallLetter">1 small letter</li>
                                                                <li class="passRegNumber">minimum 1 number</li>
                                                                <li class="passRegLength">minimum 8 characters</li></ul>`, 'required_field')
            }
            if (item.id === 'user_country') {
                requiredMessageConstuctor(item, '', `Cuontry field is required`, 'required_field')
            }
        }                
        return validator.test(item.value)
    }
}

const eaePassTypeToggler = () => {
    passEye.addEventListener('click', ()=> {
        passEye.classList.toggle('fa-eye-slash');
        if (passInput.type === 'password') {
            passInput.type = 'text'
        } else {
            passInput.type = 'password'
        }        
    })
}

const isValid = (str, reg) => {
    return reg.test(str);
}

const passStepsCheck = (input, ...reg) => {
    let passObj = {};
    reg.forEach(item => {
        passObj[item] = isValid(input.value, item);
    })
    console.log(passObj);
    return passObj;
}
const passStateManagement = obj => {
    let options = document.querySelectorAll('.pass-field_list > li');    
    for (let i = 0; i < Object.values(obj).length; i++) {
        if (!Object.values(obj)[i]) {
            options.forEach(item => item.style.color = 'red')            
        }       
    }
    options.forEach(elem => {
        console.log(elem.classList.value);
        if (obj[passRegBigLetter] && elem.classList.value === 'passRegBigLetter') {
            console.log(options.classList);
            elem.style.color = 'green';
        }
        if (obj[passRegSmallLetter] && elem.classList.value === 'passRegSmallLetter') {
            console.log(options.classList);
            elem.style.color = 'green';
        }
        if (obj[passRegNumber] && elem.classList.value === 'passRegNumber') {
            console.log(options.classList);
            elem.style.color = 'green';
        }
        if (obj[passRegLength] && elem.classList.value === 'passRegLength') {
            console.log(options.classList);
            elem.style.color = 'green';
        }
    })
    // if (obj[passRegBigLetter]) {
    //     console.log(options.classList);
    //     options[0].style.color = 'green';
    // }
    // if (obj[passRegSmallLetter]) {
    //     options[1].style.color = 'green';
    // }
    // if (obj[passRegNumber]) {
    //     options[2].style.color = 'green';
    // }
    // if (obj[passRegLength]) {
    //     options[3].style.color = 'green';
    // }
}



eaePassTypeToggler();

nameInput.addEventListener('input', ()=> {
    validationCheck(nameInput, nameReg);
})
passInput.addEventListener('input', ()=> {
    validationCheck(passInput, passReg);
    passStateManagement(passStepsCheck(passInput, passRegBigLetter, passRegSmallLetter, passRegNumber, passRegLength))

})
countryInput.addEventListener('input', ()=> {
    validationCheck(countryInput, countryReg);
})

submitBtn.addEventListener('click', ()=> {
    validationCheck(nameInput, nameReg);
    validationCheck(passInput, passReg);
    validationCheck(countryInput, countryReg);
    termsChecker(userTerms);
})




