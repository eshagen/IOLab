$(document).ready(
    $("#new-item").on('click', function() {
        // once the document loads, create new item with this function
        //alert("suckit");
        var user_input = $('#todo-item-input').val();

        // append new task to the top of to do list
        $('#todolistlist').append("<li>" + user_input + "<button> Add to Completed List </button></li>");
        
        // clear input box
        $("#todo-item-input").val("");
    })
);

$("#list_todo").on('click', "button", function() {
        // move from list_todo container to list_completed container

        // grab item to move to top of completed list
        $(this).html("Add to To Do");

        var completedItem = $(this).parent()
        $("#actualcompleted").prepend(completedItem);
});

$("#list_completed").on('click', "button", function() {
        // move back from list_completed container to list_todo container

        $(this).html("Add to Completed List");
        var toDoItem = $(this).parent()
        $("#todolistlist").prepend(toDoItem);
});
