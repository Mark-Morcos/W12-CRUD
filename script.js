$(document).ready(function () {
let userList;
let i =0;
    
$.get('http://localhost:8000/users', data => {
    userList = data
    console.log("Get executed and json data is showing in the Table");
}).done(() => builduserTable())


const builduserTable = () => { //// Main Function to get all the list of users from the json to the table
    $('#table').empty();
    userList.forEach( user => {
      
      $('#table').append(
        `<tr><td> ${user.id} </td><td> ${user.name} </td><td> 
       ${user.email} </td><td>  </td></tr>` )
       i= $(user.id);
      })
      
    };
    ////////////Function to add new user from the text input
    document.getElementById("submit").onclick = function () {
    //console.log(i);
      let table = document.getElementById("table");
      let row = table.insertRow(-1);
      let IDRow = row.insertCell(0)
      let nameRow = row.insertCell(1);
      let emailRow = row.insertCell(2);
   //// Just to add the new record to the table as the json data is not dynamiclly changing 
      IDRow.innerHTML = document.getElementById("ID").value;
      nameRow.innerHTML = document.getElementById("name").value;
      emailRow.innerHTML = document.getElementById("email").value;
       const formData = {
        id: document.getElementById("ID").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
       }
       // to create a new record in the json
    $.post('http://localhost:8000/users', 
      formData,
      (data) => { console.log(data)
      }).done(()=> $.get('http://localhost:8000/users', data => {
        userList = data
    }).done(() => builduserTable()))
      return false;
      
    }; //$('#submit').trigger(reset)
   

    document.getElementById("update").onclick = function () {
        const  formDataUpdate = {
          id: document.getElementById("ID").value,
          name: document.getElementById("name").value,
          email: document.getElementById("email").value
          
      }
      console.log('inside the update button')

      $.ajax({
          url: `http://localhost:8000/users/${formDataUpdate.id}`,
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(formDataUpdate)
      }).done(() => $.get('http://localhost:8000/users', data => {
          userList = data
          console.log("Get executed after update the record");
      }).done(() => builduserTable()))
      return false;
    };
    /////////////// function to delete the record by the ID only !!!
    document.getElementById("delete").onclick = function () {
      const  formDataDelete = {
        id: document.getElementById("ID").value,
  
        };
      
     $.ajax({
              url: `http://localhost:8000/users/${formDataDelete.id}`,
              type: 'DELETE',
              success: function() {
                console.log('Object deleted')
                //builduserTable();
                  
              }
          }) .done(() => $.get('http://localhost:8000/users', data => {
            userList = data
            console.log("Get function run again to fill the table");
        }).done(() => builduserTable()))
          return false;
      };
  });