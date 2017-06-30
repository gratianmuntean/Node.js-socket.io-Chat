/**
 * Created by grmuntean on 9/9/2016.
 */
var express = require('express');
var app = express();
var http = require('http');
//var https = require('https');
var request = require('request');
var $ = require('jquery');
var clone = require('clone');
var fs = require('fs');

// var options = {
//      key: fs.readFileSync(__dirname + '/key.pem', 'utf8'),
//     cert: fs.readFileSync(__dirname + '/cert.pem', 'utf8')
// };

//var server = https.createServer(options, app);

var server = http.createServer(app);
var io = require('socket.io')(server);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

fs.readFile(__dirname + '/public/config.json', 'utf8', function(err,data){
   if (err){
       return console.log(err);
   }
    var dataJSON = JSON.parse(data);

//First back-end request (when the server is started)
    request(dataJSON.base_url+'/chatRoom/getAllPublicAndActiveChatRooms', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonObject = JSON.parse(body);
                var rooms = jsonObject;
                handleData(rooms);
                    for (var i=0; i<rooms.length; i++){
                        rooms[i].listOfUsers =[];
                        rooms[i].emittedMessages =[];
                    }
            }else{console.log(error);}
        });
    });

//Test room in case that there are 0 rooms in DB !
var testRoom = {
    id:"1",
    name: "Test Room",
    listOfUsers: [],
    emittedMessages: []
};


var totalUsers = 0;
var count = 0;
var countReceivedMessages = 0;
var i=0;
var user= '';
var msg='';
var messageHistory=[];
var loggedUsersList=[];

    app.use(express.static(__dirname + '/public'));
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });

//TODO new IP : http://192.168.105.41:8080/\
 function handleData(rooms) {
//Back-end event for connection
io.on('connection', function(socket) {
        //TODO clean up
     //socket.disconnect();

    io.to(socket.id).emit('roomsForFront', rooms);

        var newRoom ='';
        var room = rooms[0].name;
        socket.room = room;
        socket.join(room);
        console.log('Roomul rezultat este: ', room);
        console.log('Roomul initial ales este:', newRoom);

        var clientsInSelectedRoom = io.sockets.adapter.rooms[room].length;
        console.log('numarul de clienti din roomul ' + room + ' este egal cu : ' + clientsInSelectedRoom);

        totalUsers++;
        console.log('Total useri conectati: ', +totalUsers);

        io.to(room).emit('messageM', totalUsers, room);
        io.to(rooms[0].name).emit('message', rooms[0].listOfUsers.length);
        io.to(socket.id).emit('allow access rooms', rooms.length);

    for (var i=0; i<rooms[0].emittedMessages.length; i++) {
        io.to(socket.id).emit('new history', newRoom, rooms[0].emittedMessages[i], rooms[0].emittedMessages.length);

        }

        var usernameNull = true;
        io.to(room).emit('limitOfCharacters', usernameNull, clientsInSelectedRoom);


    //Back-end event to edit rooms depending on DB
    socket.on('edit rooms depending on DB', function(data){

        if (data.length!==rooms.length){
            io.to(socket.id).emit('alert to refresh', socket.username);
        }

        console.log('Cate camere sunt pe backend ?' +rooms.length);
        console.log('Cate camere vin de pe frontend ? ' +data.length);

        if (data.length===0) {
            rooms.push(testRoom);
        }else{


        var namesFromDB=[];
        var namesfromBackEnd=[];
            for (var c=0; c<data.length; c++){
                namesFromDB.push(data[c].name);
            }
            for (var b=0; b<rooms.length; b++){
                namesfromBackEnd.push(rooms[b].name);
            }
            while (rooms.length>data.length){
                for (var i=0; i<rooms.length; i++){
                    if ((namesFromDB.indexOf(rooms[i].name) !==-1) === false){
                        rooms.splice(i,1);
                    }
                        }
            }
            while(data.length>rooms.length){
                for (var i=0; i<data.length; i++){
                   if ((namesfromBackEnd.indexOf(data[i].name) !==-1) === false){
                        rooms.push(data[i]);
                   }
                }
            }
            for (var i=0; i<rooms.length; i++){
            if (rooms[i].hasOwnProperty('listOfUsers')===false && rooms[i].hasOwnProperty('emittedMessages')===false){
                rooms[i].listOfUsers =[];
                rooms[i].emittedMessages =[];
            }
        }
        console.log('Afisare backend rooms: ');
        console.log(rooms);
        console.log('Afisare frontend rooms: ');
        console.log(data);
            for (var i=0;i<rooms.length; i++){
                console.log(rooms[i].name);
            }
            console.log(rooms.length);
       }
    });

//Back-end event for username !
        socket.on('username', function (usr) {
            console.log("User nou: " + usr);
            (function () {
                var regex = /(fut|muie|plm|bitch|fuck|damn|wtf|dick|pula|pizda|mata|pussy|tits|shit|suck|idiot|prost|naiba|penis|matii|mati)/gi;
                //var replaceWords = ["Fluffy Unicorn", "Barbie", "Penguin", "Love", "I made a BooBoo", "LMAO"];
                usr = usr.replace(regex, function () {
                    return "CHANGE NAME"
                });
                var admin = /(#admin)/gi;
                usr = usr.replace(admin, function () {
                    return "Ive"
                });
            })(usr);

            //If the user typed his username
            if (usr !== "") {
                usernameNull = false;
                totalUsers--;

                io.set(socket.id);
                io.to(room).emit('messageM', totalUsers, room);
                io.to(room).emit('popUpUser', usr);
                socket.username = usr;

                if ((loggedUsersList.indexOf(socket.username) !== -1) === false ) {
                    loggedUsersList.push(socket.username);
                    for (var i=0; i<rooms.length; i++){
                        if (rooms[i].name===room){
                            rooms[i].listOfUsers.push(usr);
                            io.to(rooms[i].name).emit('message', rooms[i].listOfUsers.length);
                        }
                    }
                    io.to(room).emit('messageM', totalUsers, room);
                    io.emit('userEnter', usr);
                }
                else{

                    console.log('In momentul duplicarii lista este: ' + loggedUsersList);
                    io.set(socket.id);
                    io.to(socket.id).emit('duplicated user', socket.username);

                    count--;
                    totalUsers++;

                    io.to(room).emit('message', rooms[0].listOfUsers.length);
                    io.to(room).emit('messageM', totalUsers, room);
                }




                for (var i=0; i<rooms.length; i++){
                    io.to(rooms[i].name).emit('usersList', rooms[i].listOfUsers);
                }
            }
            io.to(room).emit('limitOfCharacters', usernameNull, clientsInSelectedRoom);
        });


        socket.on('usernameReset', function (usr) {
           var usrForComparing = usr;

            for (i = 0; i < loggedUsersList.length; i++) {
                if (loggedUsersList[i] === socket.username) {
                    loggedUsersList[i] = usrForComparing;

                }
            }
            for (var i=0; i<rooms.length; i++){
                if (rooms[i].name===room){
                    for (var j=0; j<rooms[i].listOfUsers.length; j++){
                        if (rooms[i].listOfUsers[j] === socket.username){
                            rooms[i].listOfUsers[j] = usrForComparing;
                            console.log(socket.username);
                            console.log(usrForComparing);
                        }
                    }
                }
            }
            io.to(room).emit('userRename', socket.username, usrForComparing);
            io.to(room).emit('popUpUser', usr);
            for (var i=0; i<rooms.length; i++){
                io.to(rooms[i].name).emit('usersList', rooms[i].listOfUsers);
            }
            socket.username = usrForComparing;
        });
//Back-end event for emitted messages
        socket.on('chat message', function (msg, usr) {

            console.log('message: ' + msg);
            io.to(room).emit('username', usr);
            //filter for bad words !
            (function () {
                var regex = /(caca|cacat|fut|muie|plm|bitch|fuck|damn|wtf|dick|pula|pizda|mata|pussy|tits|shit|suck|idiot|prost|naiba|penis|matii|mati)/gi;
                var replaceWords = ["Fluffy Unicorn", "Barbie", "Penguin", "Love", "I made a BooBoo", "LMAO", "Ouch", "Oopsiee"];
                msg = msg.replace(regex, function () {
                    return replaceWords[Math.floor(Math.random() * replaceWords.length)];
                });
            })(msg);
            var admin = /(#admin)/gi;
            msg = msg.replace(admin, function () {
                return "Ive"
            });

            if (usr !== '') {
                for (var i=0; i<rooms.length; i++){
                    if (rooms[i].name===room){
                        rooms[i].emittedMessages.push(msg);
                        if (rooms[i].emittedMessages.length>50){
                            rooms[i].emittedMessages.shift();
                        }
                    }
                    console.log('In camera ' + rooms[i].id + 's-a vorbit: ' +rooms[i].emittedMessages);
                }
                messageHistory.push(msg);
                if (messageHistory.length > 50) {
                    messageHistory.shift();
                    console.log(messageHistory);
                }
                countReceivedMessages++;
            }
                for (var i=0;i <rooms.length; i++){
                    if (rooms[i].name === room){
                        io.to(room).emit('chat message', msg, rooms[i].emittedMessages);
                   }
                }
            io.to(socket.id).emit('real time comparing', rooms);
        });


//Back-end event for  disconnect ! ! !
        socket.on('disconnect', function (usr) {
            if (usernameNull == false) {
                io.emit('messageDisconnect', socket.username);
                for (var i = 0; i < loggedUsersList.length; i++) {
                    if (loggedUsersList[i] === socket.username) {
                        loggedUsersList.splice(i, 1);
                    }
                }
                        for (var i=0; i<rooms.length; i++){
                            io.to(rooms[i].name).emit('usersList', rooms[i].listOfUsers);
                        }
                        for (var i=0; i<rooms.length; i++){
                            if (rooms[i].name===room){
                                for (var j=0; j<rooms[i].listOfUsers.length; j++){
                                    if (rooms[i].listOfUsers[j]===socket.username){
                                        rooms[i].listOfUsers.splice(j,1);
                                    }

                                }
                                io.to(rooms[i].name).emit('message', rooms[i].listOfUsers.length);
                                console.log('in camera ' + rooms[i].id + ' sunt atatia: :' + rooms[i].listOfUsers);
                            }
                        }

            }
            else {
                totalUsers--;
            }

            for (var i=0; i<rooms.length; i++){
                if (rooms[i].name===room){
                    io.to(rooms[i].name).emit('message', rooms[i].listOfUsers.length);
                }
            }
            if (rooms.length>0){
                io.to(rooms[0].name).emit('messageM', totalUsers, room);
    }
            console.log('Useri logati ramasi dupa DC: ' + count);
            console.log('Total useri ramasi dupa DC: ' + totalUsers);
            socket.leave(room);
        });

    //Back-end event for changing the room
        socket.on('choose room', function (newRoom) {
            socket.leave(room);
            socket.join(newRoom);
            socket.room = newRoom;

            console.log(socket.username + "a plecat din camera: " + room + " in camera: " + newRoom);

            io.to(socket.id).emit('config new room', newRoom, socket.username, rooms);

            for (var i=0; i<rooms.length; i++){
                if (rooms[i].name===newRoom && (rooms[i].listOfUsers.indexOf(socket.username) !== -1) === false &&(socket.username!==undefined)){
                    rooms[i].listOfUsers.push(socket.username);
                }
                else if(rooms[i].name===room){
                for (var j=0; j<rooms[i].listOfUsers.length; j++){
                    if (rooms[i].listOfUsers[j]===socket.username){
                        rooms[i].listOfUsers.splice(j,1);
                        }
                    }
                }
                console.log('in camera ' + rooms[i].id + ' sunt atatia: :' + rooms[i].listOfUsers);
            }


            for (var i=0; i<rooms.length; i++) {
                io.to(rooms[i].name).emit('usersList', rooms[i].listOfUsers);
                io.to(rooms[i].name).emit('message', rooms[i].listOfUsers.length);
                io.to(rooms[0].name).emit('messageM', totalUsers, room);
            }

                for (var i = 0; i < rooms.length; i++){
                        if (rooms[i].name === newRoom){
                                for (var j=-1; j<rooms[i].emittedMessages.length; j++){
                                io.to(socket.id).emit('history per rooms', newRoom, rooms[i].emittedMessages[j], rooms[i].emittedMessages.length);
                                     }
                                     console.log('in cazul de sub 10 se vor emite: ' +rooms[i].emittedMessages.length + ' mesaje');
                        }
                }


            io.to(socket.id).emit('initial message', newRoom);

                if (socket.username!==undefined){
            for (var i=0; i<rooms.length; i++) {
                    if (rooms[i].name===newRoom){
                        io.to(room).emit('change room notification', socket.username, room, newRoom);
                    }
                    if(rooms[i].name===room){
                        io.to(newRoom).emit('change room notification', socket.username, room, newRoom);
                        }
                    }
                }

            room = newRoom;
        });
    });


}
server.listen(3000, function(){console.log("Server started")});