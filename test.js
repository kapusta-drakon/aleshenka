var lastname;
var firstname;
var year;
var day;
var month;

const containers = document.querySelectorAll('.container');
const submitButton = document.querySelector('.submit-button');
const testContainer = document.getElementById("test_div");
const finalResultTable = document.getElementById('res_table');
const fintResultTableWrapper = document.getElementById("test_res");
const formSectionNames=['one','two','three','four','five'];

const finalResultLineNumber = 1;

const inputName = 'INPUT';
const defaultSelectValue = 'default';


let formCurrentlyFilledSections = 0;
let formNeedToBeFilledSections = 0;

submitButton.addEventListener('click', calcResult);

containers.forEach(container => {
  formNeedToBeFilledSections++; 
  container.addEventListener('click', (e) => {
    if(e.target.nodeName!== inputName) return;
    formCurrentlyFilledSections++;
    [...container.children]
        .filter(elem => elem.nodeName === inputName)
        .forEach((elem) => elem.setAttribute('disabled', true));
        validateSubmitButtonStatus();

    });
})

function validateSubmitButtonStatus() {
    if(formCurrentlyFilledSections === formNeedToBeFilledSections) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('submit-button--disabled');
        submitButton.classList.add('submit-button--active');

    }
}

function onLoad() {
    // ввод фамилии
    while (!lastname) {
        lastname = this.prompt('Введите фамилию');
        lastname && (this.document.getElementById('lastname').value = lastname);
    }

    // ввод имени
    while (!firstname) {
        firstname = this.prompt('Введите имя');
        firstname && (this.document.getElementById('firstname').value = firstname);
    }
    
    setYearOptions(); 
    setMonthOptions();
    setGeneralDayOptions();
}

function setYearOptions() {
    let yearSelect = document.getElementById("selectYear");

    for (let i = new Date().getFullYear(); i > 1945; i--) {
        let el = document.createElement("option");
        el.textContent = i;
        el.value = i;
        yearSelect.appendChild(el);
    }
}

function setMonthOptions() {
    let monthSelect = document.getElementById("selectMonth");
    let options = [];

    for (let i = 1; i <= 12; i++) {
        let month = new Date(`${i}`).toLocaleString('ru-ru', { month: 'long' });
        options.push(month);
    }

    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        monthSelect.appendChild(el);
    }
}

function setGeneralDayOptions() {
    let daySelect = document.getElementById("selectDay");
    
    for (let i=1; i <= 31; i++) {
        let el = document.createElement("option");
        el.textContent = i;
        el.value = i;
        daySelect.appendChild(el);
    }
}

function startTest() {
    let selectedYear = document.getElementById("selectYear").value;
    let selectedDay = document.getElementById("selectDay").value;
    let selectedMonth = document.getElementById("selectMonth").value;

    let inValidDateValues = [selectedDay, selectedMonth, selectedYear]
        .filter(item => item === defaultSelectValue);


    if (inValidDateValues.length) {
        alert('Введите корректную дату рождения');
        return;
    }

    const questionMessage = ` ${firstname} ${lastname} Вы готовы к выполнению теста?`;
    const personsReply = confirm(questionMessage);
    
    if (personsReply) {
        testContainer.hidden=false;
        document.getElementById('start_test').hidden=true;
        year = selectedYear;
        month = selectedMonth;
        day = selectedDay;
    } else {
        alert('Повторите, когда будете готовы');
    }
}

function calcResult() {
    const myform = document.forms.test;

    const resultMark = formSectionNames
        .reduce((accumulator, sectionName) => accumulator + Number(myform[sectionName].value), 0);

    testContainer.hidden=true;

    const cell=finalResultTable.rows[finalResultLineNumber].cells;
    const finalDomResultLine = [...cell];
    const finalResultLine = [`${lastname} ${firstname}`, resultMark,  `${day} ${month} ${year}`];

    finalDomResultLine.forEach((resultCell, index) => resultCell.innerHTML = finalResultLine[index])

    fintResultTableWrapper.hidden=false;
    window.scrollTo(0,0);
}

function restart() {
    window.location.reload();
}