'use strict';

// Page specific code


// dummy data

function _getDataFromApi() {
    return ([
        {
            id: 1,
            name: 'Pruthvi',
            sex: 'M',
            salary: 1000
        },
        {
            id: 2,
            name: 'ATP',
            sex: 'F',
            salary: 1000
        },
        {
            id: 3,
            name: 'Pruthvi',
            sex: 'M',
            salary: 1000
        },
        {
            id: 4,
            name: 'Pruthvi',
            sex: 'M',
            salary: 1000
        },
        {
            id: 5,
            name: 'Pruthvi',
            sex: 'M',
            salary: 1000
        }
    ]);
}



function TableHandler() {
    // state of the app
    let employeesData = [];
    let employeeBeingEdited = null;


    function _getInititalEmployeeData() {
        employeesData =  _getDataFromApi();
    }

    function _renderEmployeeTemplate(emp) {
        return (
            `
            <li class="emp__list__item display-tr">
                <div class="emp__id display-td">
                        ${emp.id}
                </div>
                <div class="emp__name display-td">
                    ${emp.name}
                </div>
                <div class="emp__gender display-td">
                    ${emp.sex}
                </div>
                <div class="emp__actions display-td">
                    <button class="btn btn--no-border __emp__edit js-btn-edit-emp"
                        data-id=${emp.id}>
                   
                        <img class="image-action" src="edit.png" />
                    </button>
                    <button class="btn btn--no-border btn __emp__delete js-btn-delete-emp"
                        data-id=${emp.id}>
                       
                        <img class="image-action" src="delete.png" />
                    </button>
                </div>
            </li>
            `
        );
    }

    function _getEmployeeById(id) {
        const searchResult = employeesData.filter(function (emp) {
            if (emp.id === id) {
                return true;
            }

            return false;
        })

        if (searchResult.length) {
            return searchResult[0];
        }

        return null;
    }

    function _addEmployee(e) {
        e.stopPropagation();
        e.preventDefault();

        const newEmpId = parseInt(document.getElementById("js-emp-id-form").value, 10);
        const newEmpName = document.getElementById("js-emp-name-form").value;
        const selectElement = document.getElementById("js-emp-gender-form");
        const newEmpGender = selectElement.options[selectElement.selectedIndex].value;

        employeesData.push({
            id: newEmpId,
            name: newEmpName,
            sex: newEmpGender
        });

        _render();

        return false;
    }

    /**
     * Deletes emplooyee record based on the id
     * @private
     */

    function _deleteEmployeeRecord (e) {
        const currentEmpId = parseInt(e.currentTarget.getAttribute('data-id'), 10);

        const filterEmployeeData = employeesData.filter(function (emp) {
            if (emp.id !== currentEmpId) {
                return true;
            }

            return false;
        });

        employeesData = filterEmployeeData;

        _render();
    }

    function _openEmployeeEditPopup(e) {
        employeeBeingEdited = parseInt(e.currentTarget.getAttribute('data-id'), 10);

        _render();
    }

    function _editEmployee(e) {
        e.stopPropagation();
        e.preventDefault();

        const newEmpId = parseInt(document.getElementById("js-edit-emp-id").value, 10);
        const newEmpName = document.getElementById("js-edit-emp-name").value;
        const selectElement = document.getElementById("js-edit-emp-gender");
        const newEmpGender = selectElement.options[selectElement.selectedIndex].value;

        const filterEmployeeData = employeesData.filter(function (emp) {
            if (emp.id !== employeeBeingEdited) {
                return true;
            }

            return false;
        });

        filterEmployeeData.push({
            id: newEmpId,
            name: newEmpName,
            sex: newEmpGender
        });

        // hide the edit pannel
        employeeBeingEdited = null;

        employeesData = filterEmployeeData;

        _render();

        return false;
    }

    function _bindClickEvents () {

        // add listener for deleteing the employee recored

        const employeeDeleteActionABtn = document.getElementsByClassName('js-btn-delete-emp');

        for (let i = 0; i < employeeDeleteActionABtn.length; i++) {
            const currentBtn = employeeDeleteActionABtn[i];

            currentBtn.addEventListener('click', _deleteEmployeeRecord);
        }


        // add listener for deleteing the employee recored

        const employeeEditActionBtn = document.getElementsByClassName('js-btn-edit-emp');

        for (let i = 0; i < employeeEditActionBtn.length; i++) {
            const currentBtn = employeeEditActionBtn[i];

            currentBtn.addEventListener('click', _openEmployeeEditPopup);
        }

        // add form data

        const empFormSubmit = document.getElementById('js-emp-form');

        empFormSubmit.addEventListener('submit', _addEmployee);

        // edit form data

        const empEditFormSubmit = document.getElementById('js-emp-edit-form');

        empEditFormSubmit.addEventListener('submit', _editEmployee);

    }


    function _renderEmployeeEditFrom(editForm) {
        editForm.classList.remove('hide');

        const currentEmpBeingEdited = _getEmployeeById(employeeBeingEdited);

        // populate the data
        document.getElementById("js-edit-emp-id").value = currentEmpBeingEdited.id;
        document.getElementById("js-edit-emp-name").value = currentEmpBeingEdited.name;

        let selectedIndex = 0;

        if (currentEmpBeingEdited.sex === 'F') {
            selectedIndex = 1;
        }

        document.getElementById("js-edit-emp-gender").selectedIndex = selectedIndex;
    }

    function _render() {
        // render the html with the data in the state

        const employeeListElement = document.getElementById('js-emp-list');

        let employeDataHtml = '';

        employeesData.forEach(function (emp){
            employeDataHtml = employeDataHtml + _renderEmployeeTemplate(emp);
        });

        employeeListElement.innerHTML = employeDataHtml;


        // open the edit window

        const editForm = document.getElementById('js-emp-edit-form');

        if (employeeBeingEdited !== null) {
            _renderEmployeeEditFrom(editForm);
        } else {
            if (!editForm.classList.contains('hide')) {
                editForm.classList.add('hide');
            }
        }

        _bindClickEvents();
    }


    return {
        init: function () {
            _getInititalEmployeeData();

            _render();


        }
    };
}

// secure window objects


// start rendering the page
const Table = TableHandler();

Table.init();

