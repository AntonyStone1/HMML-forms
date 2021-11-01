'use strict'
const userForm = document.querySelector('.form-container')
const selected = document.querySelector('select');
const formName = document.getElementById('user_name')
const formPass = document.getElementById('user_pass')
const formBtn = document.getElementById('form_button')
const formCountry = document.getElementById('user_country')
const inputs = document.getElementsByTagName('input')

let inputsArr = Array.from(inputs)
console.log(inputs);
let regCheck = new RegExp ('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');


function isValid(str){
    return regCheck.test(str);
}

inputsArr.map(item => {
    item.addEventListener('input', (event) => {
        if (formName.value !== '') {
            formName.classList.toggle('input__active')
            console.log(formPass.value);
        } else {
            formName.classList.remove('input__active')
        }
        console.log(1);
    })
})

// document.addEventListener('click', (event) => {
//     if (formName.value !== '') {
//         formName.classList.add('input__active')
//         console.log(formPass.value);
//     }
// })

formPass.onblur = function() {
    if (isValid(this.value)) {
        this.classList.add('input__active')
    }
}


// const mainForms = document.forms.main;
// const mainSelect = mainForms.userCountry;
// const formName = mainForms.userName;
// console.log(mainSelect.options[0].value);

   