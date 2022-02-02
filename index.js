//using Tr-td
var finalArrays = [];
var isValid = null;
var selectValues = null;

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('others').checked = false;
    document.getElementById('hobby1').checked = false;
    document.getElementById('hobby2').checked = false;
    document.getElementById('hobby3').checked = false;
}

function getRadioVal(radioGroup) {
    var elements = document.getElementsByName(radioGroup);
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
}
function getCheckboxVal() {
    var arrayCheckbox = [];
    var checkBoxs = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkBoxs.length; i++) {
        arrayCheckbox.push(checkBoxs[i].value);
    }
    return arrayCheckbox;
}

function validateFunction() {
    if (document.getElementById("name").value == "" || document.getElementById("address").value == "" || document.getElementById("email").value == "" || document.getElementById("password").value == "" || getRadioVal("gender") == undefined || getCheckboxVal() == "") {
        isValid = false;
    }
    else {
        isValid = true;
    }
}

function showError() {
    if (document.getElementById("name").value == "") {
        document.getElementById("hidenName").style.display = "inline", color = "red";
    } else {
        document.getElementById("hidenName").style.display = "none";
    }
    if (document.getElementById("address").value == "") {
        document.getElementById("hidenAddress").style.display = "inline";
    } else {
        document.getElementById("hidenAddress").style.display = "none";
    }
    if (document.getElementById("email").value == "") {
        document.getElementById("hidenEmail").style.display = "inline";
    } else {
        document.getElementById("hidenEmail").style.display = "none";
    }
    if (document.getElementById("password").value == "") {
        document.getElementById("hidenPassword").style.display = "inline";
    } else {
        document.getElementById("hidenPassword").style.display = "none";
    }
    if (getRadioVal("gender") == undefined) {
        document.getElementById("hidenGender").style.display = "inline", color = "red";
    } else {
        document.getElementById("hidenGender").style.display = "none";
    }
    if (getCheckboxVal() == "") {
        document.getElementById("hidenHobby").style.display = "inline", color = "red";
    } else {
        document.getElementById("hidenHobby").style.display = "none";
    }
}
function FormSubmit(event) {
    event.preventDefault();
    console.log("form submit")
    showError();
    validateFunction();
    if (isValid == true) {
        if (selectValues == null) {
            validateFunction();
            showError();
            addNoramalData();
        }
        if (selectValues !== null) {
            validateFunction();
            showError();
            editDataBase();
        }
    }
}

function editDataBase() {
    finalArrays.map((val) => {
        if (val.ids == selectValues) {
            val.names = document.getElementById("name").value;
            val.textAreas = document.getElementById("address").value;
            val.mails = document.getElementById("email").value;
            val.passwords = document.getElementById("password").value;
            val.genders = getRadioVal("gender");
            val.hobbys = getCheckboxVal();
            selectValues = null;
        }
        window.localStorage.setItem("mainData", JSON.stringify(finalArrays));
        resetForm();
        createTableEntry();
    })
}

function addNoramalData() {
    var UniqueID = Date.now();
    var Name = document.getElementById("name").value;
    var TextArea = document.getElementById("address").value;
    var Email = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var Gender = getRadioVal("gender");
    var Hobby = getCheckboxVal();
    let mainArray = [
        ...finalArrays,
        {
            ids: UniqueID,
            names: Name,
            textAreas: TextArea,
            mails: Email,
            passwords: Password,
            genders: Gender,
            hobbys: Hobby,
        },
    ];
    finalArrays = mainArray;
    window.localStorage.setItem("mainData", JSON.stringify(finalArrays));
    resetForm();
    createTableEntry();
}

function createTableEntry() {
    var localData = window.localStorage.getItem("mainData");
    localData = JSON.parse(localData);
    console.log("createentry")
    var tablePrint = "";
    for (var i = 0; i < localData.length; i++) {
        tablePrint += `<tr><td>${localData[i].names}</td>
        <td>${localData[i].textAreas}</td>
        <td>${localData[i].mails}</td>
        <td>${localData[i].passwords}</td>
        <td>${localData[i].genders}</td>
        <td>${localData[i].hobbys}</td>
        <td><button class="btn btn-outline-dark " onclick="editData(${localData[i].ids})">Edit</button></td>
        <td><button class="btn btn-outline-danger " onclick="deleteData(${localData[i].ids})">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = tablePrint;
}

window.onload = function () {
    createTableEntry()
}

function editData(datas) {
    resetForm();
    var localData = window.localStorage.getItem("mainData");
    localData = JSON.parse(localData);
    finalArrays.map((data) => {
        if (data.ids == datas) {
            document.getElementById("name").value = data.names;
            document.getElementById("address").value = data.textAreas;
            document.getElementById("email").value = data.mails;
            document.getElementById("password").value = data.passwords;
            document.getElementsByName("gender").value = data.genders;

            var addedGender = data.genders;
            var checkedValues = data.hobbys;

            var val1 = checkedValues[0];
            var val2 = checkedValues[1];
            var val3 = checkedValues[2];

            if (addedGender == "male") {
                document.getElementById("male").checked = true;
            }
            if (addedGender == "female") {
                document.getElementById("female").checked = true;
            }
            if (addedGender == "others") {
                document.getElementById("others").checked = true;
            }

            if (val1 == "Music" || val2 == "Music" || val3 == "Music") {
                document.getElementById("hobby1").checked = true;
            }
            if (val1 == "Reading" || val2 == "Reading" || val3 == "Reading") {
                document.getElementById("hobby2").checked = true;
            }
            if (val1 == "Cricket" || val2 == "Cricket" || val3 == "Cricket") {
                document.getElementById("hobby3").checked = true;
            }
            selectValues = data.ids;
        }
    });
}

function deleteData(datas) {
    var deletedData = finalArrays.filter((data) => data.ids !== datas);
    finalArrays = deletedData;
    window.localStorage.setItem("mainData", JSON.stringify(finalArrays));
    createTableEntry();
}