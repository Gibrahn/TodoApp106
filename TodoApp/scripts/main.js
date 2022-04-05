let nonImportantIcon = "fas fa-thumbs-up"
let importantIcon = "far fa-thumbs-up"
let isImportant = true;
let isPanelVisible =  true;
// let btnLabel = "Show"


function toggleImportance() {
  console.log("icon clicked");

  if(isImportant) {
    //switch to no imp
    $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon)
    isImportant = false;
  }
  else {
    $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon)
    isImportant = true;
  }
}

function toggleVisibility() {
  if(isPanelVisible) {
    $("#form").css({display: 'none'})
    $("#btnVisibility").text("Show Form")
    isPanelVisible = false
  }
  else {
    $("#form").css({display: 'block'})
    $("#btnVisibility").text("Hide Form")

    isPanelVisible = true
  }
}

function saveTask(){
    console.log("Saving Task...");

    //read values 
    var title = $("#txtTitle").val();
    var desc = $("#txtDescription").val();
    var dueDate = $("#selDueDate").val();
    var startDate = $("#selStartDate").val();
    var category = $("#selCategory").val();
    var color = $("#selColor").val();

    
    if(title.length < 5){ //if the title is empty, show an error and DO NOT continue
        
        setTimeout(function() {
            $("#alertError").removeClass("hide");
        } , 5000); // timer

        return; // get out; do not continue on this function
    }else {
        let task = new Task (title, desc, dueDate, startDate, category, color);
    }
    console.log(task);
    // send the task to the server
    sendTAskToServer(task);
}
function clearForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selDueDate").val("");
    $("#selStartDate").val("");
    $("#selCategory").val("");
    $("#selColor").val("");
}

//send the task to server
function sendTAskToServer(task) {

    let jsonData = JSON.stringify(task); //encode the obj to a json string
    console.log("jsonData ",jsonData);
  
    $.ajax({
      type:"POST",
      url : "https://fsdiapi.azurewebsites.net/api/tasks/",
      data: jsonData,
      contentType: "application/json",//specify

      success: function(data) {
        displayTask(task);
        clearForm();    
      },
      error: function(errorDetails) {
        console.log("errorDetails... ", errorDetails);
      }
    });
    //display the task
    displayTask(task);
  }
function displayTask(task) {
    let syntax = `
        <div class="task" style="border: 2px solid ${task.color}">
            <div class="info">
                <h5>${task.title}</h5>
                <p>${task.desc}</p>
            </div>
            <div class="dates">
                <label>${task.startDate}</label>
                <label>${task.dueDate}</label>
            </div>
        </div>
    `;

    $("#task-container").append(syntax);
}

// function test () {
//     $.ajax({
//         type: "GET",
//         url: "https://restclass.azurewebsites.net/api/test",
//         success: function(response){
//                 console.log("Server says:", response);
//         },
//         error: function(errorDetails){
//             console.log(errorDetails);
//         }
//     })
// }

function loadTasks(){
    $.ajax({
        type:"GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(jsonData) {

            let data = JSON.parse(jsonData);
            console.log(data);
             //decode the json string to object // array

            //travel the array, get every element from the array (task)
            //send the task to be displayed on screen
            for (let i=0; i < data.length; i++){
                let task = data[i];
                //if the task belongs to me then display
                if(task.owner == "Gibrahn") {
                    displayTask(task);
                }
            }
        },
        error: function(errorDetails){
            console.error(errorDetails); //log | error | warning
        },
    });
}
function init() {
    console.log("Task manager");
  
    //load data
    loadTasks();
    //hook events
    $("#iImportant").click(toggleImportance);
    $("#btnTogglePanel").click(toggleVisibility)
    $("#btnSave").click(saveTask);
    
  }
window.onload = init;