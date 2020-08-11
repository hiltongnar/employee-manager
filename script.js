
/*
hides table on page load
*/

$(document).ready(function(){
  $("#search-table").hide();
  });

/*
Class used to define and organize employee information
*/


class Person {
  constructor(id, first, last, salary, manID, pplman){

    this.empID = id;
    this.firstName = first;
    this.lastName = last;
    this.salary = salary;
    this.managerID = manID;
    this.pplManaged = pplman;
  }

  updateID(newId) {
    this.empID = newId;
  }

  updateFirstName(newName){
    this.firstName = newName;
  }

  updateLastName(newName) {
    this.lastName = newName;
  }

  updateSalary(sal) {
    this.salary = sal;
  }

  updateManID(newID) {
    this.managerID = newID;
  }

  addEmployee(id) {
    this.pplManaged.push(id);
  }

  deleteEmployee(id){
    for (let x = 0; x < this.pplManaged.length; x++) {
      if (this.pplManaged[x] === id) {
          this.pplManaged.splice(0, 1);
      }
    }
  }

}

/*
class used as a directory of Person/Employee class
*/

class Directory {
  constructor(){
    this.directory = [];
  }

  addPerson(person){
    this.directory.push(person);
  }

  sort() {
    let len = this.directory.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (j != len - 1) {
              if ((this.directory[j].firstName + this.directory[j].lastName) > (this.directory[j + 1].firstName + this.directory[j + 1].lastName)) {
                  let tmp = this.directory[j];
                  this.directory[j] = this.directory[j + 1];
                  this.directory[j + 1] = tmp;
                }
              }
        }
    }
  }

  deletePerson(empID){
      for (let x = 0; x < this.directory.length; x++) {
        if (this.directory[x].empID === empID) {
          this.directory.splice(x, 1);
        }
      }
    }
  }

var directory = new Directory();

/*
function that looks for presence of employee id on Modal click,
 if id exists it runs edit function, if not it adds new person to directory
*/

function modalSubmit(emp){
  emp = $("#modal-emp-id").val();

  let loc = findEmployee(emp);

  if(loc == -1){
    initialAdd();
  } else {
    saveEdit();
  }
    $("#addModal").modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}


/*
function that adds employee information to the directory
*/

function initialAdd(){
  let num = $("#modal-emp-id").val();
  let fname = $('#modal-fname').val();
  let lname = $('#modal-lname').val();
  let sal = $('#modal-salary').val();
  let man =  $('#modal-man-id').val();
  let peeps = $("#modal-ppl-man").val();

  let newPerson = new Person(num, fname, lname, sal, man, peeps);
console.log(directory.directory);
directory.addPerson(newPerson);
directory.sort();
console.log(directory.directory);
appendEmployee(newPerson);

$("#"+num+"empID").val(num);
$("#"+num+"fname").val(fname);
$("#"+num+"lname").val(lname);
$("#"+num+"salary").val(sal);
$("#"+num+"man-id").val(man);
$("#"+num+"ppl-man").val(peeps);


}

/*
function that removes employee from the directory
*/

function deleteEmployee(empID) {
  if ($("#customers").is(":hidden")) {
      $("#search-table").hide();
      $("#customers").show();
  }

$("#"+empID).remove();
directory.deletePerson(empID);

}

/*
function that loops through directory to find index of an employee ID and return it.
*/

function findEmployee(empID){
  var index = -1;

  for (let x = 0; x < directory.directory.length; x++) {
   if (directory.directory[x].empID ==  empID ) {
    index = x;
   }
  }
  return index;
}

/*
function that finds employee in directory by index of employee ID,
passes that into renderModal function.
*/

function editEmployee(empID){


var index = -1;

for (let x = 0; x < directory.directory.length; x++) {
 if (directory.directory[x].empID ==  empID ) {
  index = x;
 }
}

renderModal(directory.directory[index]);

$('#addModal').modal('show');

$('.modal-backdrop').hide();
}

function saveEdit(){
  let num = $("#modal-emp-id").val();
  let fname = $('#modal-fname').val();
  let lname = $('#modal-lname').val();
  let sal = $('#modal-salary').val();
  let man =  $('#modal-man-id').val();
  let peeps = $("#modal-ppl-man").val();

  /* 7/20
  let loc = findEmployee(id);
directory[loc] = newPerson;
function should run similar to initial add, update the directory
and render new info to the table.
*/

  let newPerson = new Person(num, fname, lname, sal, man, peeps);
console.log(directory.directory);
let loc = findEmployee(num);
directory.directory[loc] = newPerson;
directory.sort();
console.log(directory.directory);

$("#"+num+"empID").html(num);
$("#"+num+"fname").html(fname);
$("#"+num+"lname").html(lname);
$("#"+num+"salary").html(sal);
$("#"+num+"man-id").html(man);
$("#"+num+"ppl-man").html(peeps);

}

/*
function that renders the values given from person object to the modal.
*/

function renderModal(person){
  $('#modal-emp-id').val(person.empID);
  $('#modal-fname').val(person.firstName);
  $('#modal-lname').val(person.lastName);
  $('#modal-salary').val(person.salary);
  $('#modal-man-id').val(person.managerID);
  $('#modal-ppl-man').val(person.pplManaged);
}

/*
function that replaces any modal values with empty value
*/

function blankModal(){
  $('#modal-emp-id').val();
  $('#modal-fname').val();
  $('#modal-lname').val();
  $('#modal-salary').val();
  $('#modal-man-id').val();
  $('#modal-ppl-man').val();
}

/*
function that appends employee values to the table display
*/

function appendEmployee(newPerson) {


let empInfo = `<tr id="` + newPerson.empID +`">
    <td id="${newPerson.empID}empID">` + newPerson.empID + `</td>
    <td id="${newPerson.empID}fname">` + newPerson.firstName + `</td>
    <td id="${newPerson.empID}lname">` + newPerson.lastName + `</td>
    <td id="${newPerson.empID}salary">$` + newPerson.salary + `</td>
    <td id="${newPerson.empID}man-id">` + newPerson.managerID + `</td>
    <td id="${newPerson.empID}ppl-man">` + newPerson.pplManaged + `</td>
    <td>
      <button type="button" class="btn button1 add" onclick="editEmployee(` + newPerson.empID + `);" data-target="#exampleModalCenter">
        Edit
      </button>

      <button onclick="deleteEmployee(` + newPerson.empID + `)" class="button button3"><i class="fas fa-times-circle"></i>Delete</button>
    </td>
  </tr>`;

  $("#customers").append(empInfo);
}

/*
function that searches the directory
*/
var items = directory.directory;

function itemSearch() {
    $('.searchClear').remove();
    let item = $("#mySearch").val();
    for(var i=0; i < items.length; i++) {

        if(items[i].firstName + " " + items[i].lastName === item) {
            console.log("Found this person.")
            console.log(items[i]);
            $("#customers").hide();
            $("#search-table").show();
            appendSearchedEmployee(items[i]);
            return;
        }
    }
    //item not found
    alert("User not found.");

}

/*
function that appends the searched employee values
*/

function appendSearchedEmployee(newPerson) {


let empInfo = `<tr class="searchClear" id="` + newPerson.empID + "search" +`">
    <td>` + newPerson.empID + `</td>
    <td>` + newPerson.firstName + `</td>
    <td>` + newPerson.lastName + `</td>
    <td>$` + newPerson.salary + `</td>
    <td>` + newPerson.managerID + `</td>
    <td>` + newPerson.pplManaged + `</td>
    <td>
      <button type="button" class="btn button1 add" data-toggle="modal" data-target="#exampleModalCenter">
        Edit
      </button>
      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Edit Employee</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action=''>
                <label for="emp-id">Employee ID:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.empID + `" id="` + newPerson.empID + "search" + `empID" name="emp-id" placeholder="12345"><br>
                <label for="fname">First name:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.firstName + `" id="` + newPerson.empID + "search" + `fname" name="fname" placeholder="First"><br>
                <label for="lname">Last name:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.lastName + `" id="` + newPerson.empID + "search" + `lname" name="lname" placeholder="Last"><br>
                <label for="salary">Salary:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.salary + `" id="` + newPerson.empID + "search" + `salary" name="salary" placeholder="$50,000"><br>
                <label for="man-id">Manager ID:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.managerID + `" id="` + newPerson.empID + "search" + `man-id" name="man-id" placeholder="12345"><br>
                <label for=ppl-man>Employees managed:</label><br>
                <input type="text" class"input-fields" value="` + newPerson.pplManaged + `" id="` + newPerson.empID + "search" + `ppl-man" name="ppl-man" placeholder="00000"><br>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onclick="editEmployee(` + newPerson.empID + `)" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <button onclick="deleteEmployee(` + newPerson.empID + `)" class="button button3"><i class="fas fa-times-circle"></i>Delete</button>
    </td>
  </tr>`;

  $("#search-table").append(empInfo);
}
