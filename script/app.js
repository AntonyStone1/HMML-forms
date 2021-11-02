'use strict'
// const formName = document.getElementById('user_name')
// const formCountry = document.getElementById('user_country')
const userForm = document.querySelector('.form-container');
const selected = document.querySelector('select');
const formPass = document.getElementById('user_pass');
const inputs = document.getElementsByTagName('input');
const passEyeIcon = document.querySelector('.pass_visibility');
const passInput = document.getElementById('user_pass');
const formBtn = document.getElementById('form_button')
const countryArrow = document.querySelector('.country_arrow');
let inputsArr = Array.from(inputs);


inputsArr.forEach(item => {
    if (item.placeholder == 'Name') {
        item.addEventListener('input', () => {
            if (item.value !== '') {
                item.classList.add('input__active')
                document.querySelector('.form-container_name').classList.remove('required_field')
            } else {
                item.classList.remove('input__active')
                document.querySelector('.form-container_name').classList.add('required_field')
            }
        })
    }    
})


let regCheck = new RegExp ('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
function isValid(str){
    return regCheck.test(str);
}
formPass.onblur = function() {
    if (isValid(this.value)) {
        this.classList.add('input__active')
        document.querySelector('.form-container_pass').classList.remove('required_field')
    }
}

passEyeIcon.addEventListener('click', () => {
    if (passInput.type === 'password') {
        passInput.type = 'text';
        passEyeIcon.classList.add('pass_visibility__hidden')
    } else {
        passInput.type = 'password'
        passEyeIcon.classList.remove('pass_visibility__hidden')
    };
})


selected.addEventListener('click', (e) => {
    if (selected.value !== 'Country') {
        selected.classList.add('input__active');
        document.querySelector('.form-container_country').classList.remove('required_field')
    }
    countryArrow.classList.toggle('country_arrow__rotate')
})



const checkForms = () => {    
    let bodyObj = {
        text: false,
        password: false,
        radio: false,
        checkbox: false,
        country: false
    };
    let result = true;
    inputsArr.map(item => {
        if (item.type === 'text' && item.value.length >= 3) {
            bodyObj[item.type] = true;
        }
        if (item.type === 'password' && isValid(item.value)) {
            bodyObj[item.type] = true;      
            }
        if (item.type === 'radio' && item.checked) {
            bodyObj[item.type] = true;  
            }
        if (item.type === 'checkbox' && item.checked) {
            bodyObj[item.type] = true;       
            }
    })
    if (selected.value !== 'Country') {
        bodyObj.country = true;
    }
    Object.values(bodyObj).forEach(item => item !== true ? result = false : result)
    return result;
}




document.addEventListener('input', (e)=> {
    if (checkForms()) {
        formBtn.classList.add('form_button__active');
    } else {
        formBtn.classList.remove('form_button__active');
    }
})


