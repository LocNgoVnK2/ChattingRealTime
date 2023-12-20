"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
document.getElementById("sendButton").disabled = true;

var room = "default"; // Set the default room ID

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${user} : ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    // Join the default room when the connection is established
    connection.invoke("JoinRoom", room).catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", room, user, message).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});

// Add logic to change rooms as needed
// For example, you can add a button to switch rooms
document.getElementById("changeRoomButton").addEventListener("click", function (event) {
    var newRoom = document.getElementById("roomInput").value;
    connection.invoke("LeaveRoom", room).catch(function (err) {
        return console.error(err.toString());
    });

    connection.invoke("JoinRoom", newRoom).catch(function (err) {
        return console.error(err.toString());
    });

    room = newRoom;
    event.preventDefault();
});
