'use strict'
const submitBtn = document.querySelector('#form_button')
const passEye = document.querySelector('.fa-eye');
const nameInput = document.querySelector('#user_name')
const passInput = document.querySelector('#user_pass')
const countryInput = document.querySelector('#user_country')

let passReg = new RegExp ('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
let nameReg = new RegExp ('(?=.*[a-z])(?=.*[A-Z]).{3,}');
let countryReg = /[^Country]/;

// function requiredMessageConstuctor (elementPadding, messageInnerHTML, messageClass) {
    
//     this.closest('div').style.paddingBottom = `${elementPadding}`
//     let validationMessage = document.createElement('span');
//     validationMessage.classList.add('validation-message');
//     validationMessage.innerHTML = `${messageInnerHTML}`
//     this.closest('div').append(validationMessage);
//     this.closest('div').classList.add(`${messageClass}`);
// }

function validationCheck (item, validator) {
        console.log(this);
    if (validator.test(item.value)) {
        item.closest('div').lastChild.innerHTML = '';
        item.closest('div').style.paddingBottom = '';
        item.closest('div').classList.remove('required_field');
        return validator.test(item.value)
    } else {
        if (item.closest('div').lastElementChild.classList.value !== 'validation-message') {
            if (item.id === 'user_name') {
                item.closest('div').style.paddingBottom = '7px'
                let validationMessage = document.createElement('span');
                validationMessage.classList.add('validation-message');
                validationMessage.innerHTML = `Minimum 3 letters <br> Only letters`;
                item.closest('div').append(validationMessage);
                item.closest('div').classList.add('required_field');
            }
            if (item.id === 'user_pass') {
                    item.closest('div').style.paddingBottom = '18px'
                    let validationMessage = document.createElement('span');
                    validationMessage.classList.add('validation-message');
                    validationMessage.innerHTML = `<ul><li>1 uppercase</li><li>1 capital letter</li><li>minimum 8 characters</li></ul>`;
                    item.closest('div').append(validationMessage);
                    item.closest('div').classList.add('required_field');
            }
            if (item.id === 'user_country') {
                let validationMessage = document.createElement('span');
                validationMessage.classList.add('validation-message');
                validationMessage.innerHTML = `Cuontry field is required`;
                item.closest('div').append(validationMessage);
                item.closest('div').classList.add('required_field');
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

eaePassTypeToggler();


submitBtn.addEventListener('click', ()=> {
    validationCheck(nameInput, nameReg);
    validationCheck(passInput, passReg);
    validationCheck(countryInput, countryReg);
})

