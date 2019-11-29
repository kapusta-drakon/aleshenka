var lastname;
var firstname;
var year;
var day;
var month;

function onLoad() {
    // ввод фамилии
    while (!lastname) {
        lastname = this.prompt('Введите фамилию');
        this.document.getElementById('lastname').value = lastname;
    }

    // ввод имени
    while (!firstname) {
        firstname = this.prompt('Введите имя');
        this.document.getElementById('firstname').value = firstname;
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
    if ('default' ===  selectedYear || 'default' ===  selectedMonth || 'default' ===  selectedDay) {
        alert('Введите корректную дату рождения');
        return;
    }
    if (confirm(firstname + ` ` + lastname + `, Вы готовы к выполнению теста?`)) {
        document.getElementById("test_div").hidden=false;
        document.getElementById('start_test').hidden=true;
        year = selectedYear;
        month = selectedMonth;
        day = selectedDay;
    } else {
        alert('Повторите, когда будете готовы');
    }
}

function calcResult() {
    let myform = document.forms.test;
    let value = +myform.one.value + +myform.two.value + +myform.three.value + +myform.four.value + +myform.five.value;
    document.getElementById('test_div').hidden=true;
    var cell=document.getElementById('res_table').rows[1].cells;
    cell[0].innerHTML = lastname + ' ' + firstname;
    cell[1].innerHTML = value;
    cell[2].innerHTML = `${day} ${month} ${year}`;
    document.getElementById("test_res").hidden=false;
    window.scrollTo(0,0);
}

function restart() {
    window.location.reload();
}