/**
 * Created by grmuntean on 9/9/2016.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var $ = require('jquery');
var clone = require('clone');
// var allowAppend = true;
var fs = require('fs');
fs.readFile(__dirname + '/public/config.json', 'utf8', function(err,data){
   if (err){
       return console.log(err);
   }
    var dataJSON = JSON.parse(data);

request(dataJSON.base_url+'/chatRoom/getAllPublicAndActiveChatRooms', function (error, response, body) {
     // var jsonObject = JSON.parse(body);
     // console.log(jsonObject);
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
})

//TODO new IP : http://192.168.105.41:8080/\
 function handleData(rooms) {




   //  console.log(rooms[1].description);


//Event pentru connection ! ! !
io.on('connection', function(socket) {
    //TODO CURATENIE
    //function handleData(rooms) {
     //socket.disconnect();


    console.log('la noua conexiune sunt atatea camere: ' +rooms.length);
        io.to(socket.id).emit('roomsForFront', rooms);
       // io.emit('edit rooms depending on DB', rooms, data);
    //io.emit('userEnter', socket.username);
   // console.log(rooms);

        var newRoom ='';
        var room = rooms[0].name;
        socket.room = room;
        socket.join(room);
        console.log('Roomul rezultat sa spunem asa este: ', room);
        console.log('Roomul initial ales este:', newRoom);
        var clientsInSelectedRoom = io.sockets.adapter.rooms[room].length;
        console.log('numarul de clienti din roomul ' + room + ' este egal cu : ' + clientsInSelectedRoom);

        totalUsers++;
        console.log('Total useri conectati: ', +totalUsers);
        io.to(room).emit('messageM', totalUsers, room);
        io.to(rooms[0].name).emit('message', rooms[0].listOfUsers.length);


    for (var i=0; i<rooms[0].emittedMessages.length; i++) {
        io.to(socket.id).emit('new history', newRoom, rooms[0].emittedMessages[i], rooms[0].emittedMessages.length);

        }

        var usernameNull = true;
        io.to(room).emit('limitOfCharacters', usernameNull, clientsInSelectedRoom);



    socket.on('edit rooms depending on DB', function(data){
        console.log('Aici e evenimentul de EDIT !');
        console.log('Afisare backend rooms: ');
        console.log(rooms);
        console.log('Afisare frontend rooms: ');
        console.log(data);
        if (data.length!==rooms.length){
            io.to(socket.id).emit('alert to refresh', socket.username);
        }
        console.log('Afisare lungimi json-uri pe edit rooms: ');
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
            console.log(namesFromDB);
            for (var i=0;i<rooms.length; i++){
                console.log(rooms[i].name);
            }
            console.log(rooms.length);
       }


    });

//Event pentru username ! ! !
        socket.on('username', function (usr) {

            console.log("User nou: " + usr);
            console.log('SE STIE CA INITIAL USERUL ESTE EGAL COOOO: ' + usernameNull);
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


            if (usr !== "") {
                //count++;
                usernameNull = false;
                totalUsers--;
                io.set(socket.id);
               // io.to(socket.id).emit('allow access rooms', room, rooms.length);
                //io.to(rooms[0].name).emit('message', rooms[0].listOfUsers.length);
                io.to(room).emit('messageM', totalUsers, room);
                io.to(room).emit('popUpUser', usr);
                socket.username = usr;
                console.log('USER ABIA AJUNS:' + socket.username);
                if ((loggedUsersList.indexOf(socket.username) !== -1) === false ) {
                    loggedUsersList.push(socket.username);
                    for (var i=0; i<rooms.length; i++){
                        if (rooms[i].name===room){
                            rooms[i].listOfUsers.push(usr);
                            io.to(rooms[i].name).emit('message', rooms[i].listOfUsers.length);
                        }
                    }
                   // io.to(room).emit('message', rooms[0].listOfUsers.length);
                    io.to(room).emit('messageM', totalUsers, room);


                    io.emit('userEnter', usr);


                }
                else {

                    console.log(socket.username + ' deja exista TOTYOTOYOTO');
                    console.log('IN momentul duplicarii lista este: ' + loggedUsersList);
                    io.set(socket.id);
                    console.log("IDUL LUI " + socket.username + "ESTE " + socket.id);
                    io.to(socket.id).emit('duplicated user', socket.username);
                    console.log('Valoarea userului emis de fapt este ', socket.username);
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
            console.log('USR ESTE: ' + usrForComparing);
            console.log('socketul este ' + socket.username);

            io.to(room).emit('userRename', socket.username, usrForComparing);
            io.to(room).emit('popUpUser', usr);
            for (var i=0; i<rooms.length; i++){
                io.to(rooms[i].name).emit('usersList', rooms[i].listOfUsers);
            }
            socket.username = usrForComparing;
            console.log(loggedUsersList);


        });
//Event pentru mesaj ! ! !
        socket.on('chat message', function (msg, usr) {
            console.log('message: ' + msg);

            io.to(room).emit('username', usr);
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


//Event pentru disconnect ! ! !
        socket.on('disconnect', function (usr) {
            // io.emit('messageDisconnect', usr);
            //totalUsers--;


            if (usernameNull == false) {
                //count--;

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
            //io.to(rooms[0].name).emit('message', rooms[0].listOfUsers.length);
    if (rooms.length>0){

                io.to(rooms[0].name).emit('messageM', totalUsers, room);
    }


            console.log('Useri LOGATI ramasi dupa DC: ' + count);
            console.log('Total useri ramasi dupa DC: ' + totalUsers);
            socket.leave(room);



        });

        socket.on('choose room', function (newRoom) {
            socket.leave(room);
            socket.join(newRoom);

            console.log('Roomul ales acum este: ', newRoom);
            socket.room = newRoom;
            console.log('Camera selectat in acest moment este: ' + socket.room);
            console.log('numarul de clienti din roomul' + newRoom + ' este egal cu : ' + clientsInSelectedRoom);

            console.log(socket.username + "a plecat din camera: " + room + " in camera: " + newRoom);
            //io.emit('message', clientsInSelectedRoom);
            console.log('lista de useri din fiecare Room actualizata este: ');
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
                //io.to('Lobby').emit('message', count);

                    io.to(rooms[0].name).emit('messageM', totalUsers, room);
                }


            // for (var i=0;i<rooms.length; i++){
            //     if (rooms[i].name===room){
            //         io.to(room).emit('history per rooms', rooms[i].emittedMessages);
            //     }
            // }


            //if (countReceivedMessages <= 30) {
                for (var i = 0; i < rooms.length; i++){
                        if (rooms[i].name === newRoom){
                                for (var j=-1; j<rooms[i].emittedMessages.length; j++){
                                io.to(socket.id).emit('history per rooms', newRoom, rooms[i].emittedMessages[j], rooms[i].emittedMessages.length);
                                     }
                                     console.log('in cazul de sub 10 se vor emite: ' +rooms[i].emittedMessages.length + ' mesaje');

                        }

                }
            //}
            // else {
            //     for (var i = 0; i < rooms.length; i++) {
            //         if (rooms[i].name === newRoom){
            //             for (var j=-1; j<30; j++){
            //                 io.to(socket.id).emit('history per rooms', newRoom,  rooms[i].emittedMessages[j], rooms[i].emittedMessages.length);
            //             }
            //             console.log('in cazul de peste 10 se vor emite: ' +rooms[i].emittedMessages.length + ' mesaje');
            //         }
            //
            //     }
            //
            // }
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

            // for (var i=0; i<rooms.length; i++){
            //         if (rooms[i].name===newRoom){
            //             io.to(socket.id).emit('initial message', rooms[i].name);
            //             rooms[i].emittedMessages.length++;
            //         }
            //         rooms[i].emittedMessages--;
            // }


            //
            // for (var i=0; i<rooms.length; i++){
            //     if (rooms[i].emittedMessages.length===0){
            //         console.log(rooms[i].name);
            //         for (var j=0; j<rooms[i].emittedMessages.length; j++){
            //             io.to(socket.id).emit('history per rooms', rooms[i].emittedMessages[j], rooms[i].emittedMessages.length);
            //         }
            //
            //
            //     }
            // }




            room = newRoom;
        });


    // socket.on('data event', function(data){
        //   // console.log(data);
        // });

    //}

        });


}



http.listen(3000, function(){
    console.log('listening on *:3000');
});