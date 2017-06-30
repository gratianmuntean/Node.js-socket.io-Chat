/**
 * Created by grmuntean on 9/9/2016.
 */
var username = '';
var firstMessage = false;
var socket = io();
var msgNou= '';
var showButton = $('.bottomInput');
var closePopUp = $('.quitPopUp');
var userBoolean = false;
var rightArrow = $('<span class="triangle-right"></span>');
var leftArrow = $('<span class="triangle-left"></span>');
var realTimeForMessages = ($('<span id="time"></span>'));
var duplicateBoolean=false;
// var continueCounter = 1;
var checkBoolean = true;
$('.formShow').submit(function(){
    $('.ScrollStyle').animate({scrollTop: $('.ScrollStyle').height()}, 99600);
    // if (duplicateBoolean===false){
    if (username === '')
    {
        var subStringOnError = "<onError";
        var subStringonerror = "<onerror";
        var subStringScript = "<script";
        var subStringFrame = "<iframe";
        var subStringStyle = "<style";
        var IveNotAllowed = /(ive)/gi;
        //socket.emit('usersList', listOfUsers);
        // var isLetter = !String.IsNullOrEmpty($('#input-message').val()) && Char.IsLetter($('#input-message').val()[0]);
        // console.log(isLetter);


        if ($('#input-message').val() === '')
        {
            alert('Please type something before pressing enter!');
        }
        else if (($('#input-message').val().indexOf(subStringScript)!==-1)===true){
            alert('This name is not allowed !!!');
        }
        else if (($('#input-message').val().indexOf(subStringOnError)!==-1)===true){
            alert('This name is not allowed !!!');
        }
        else if (($('#input-message').val().indexOf(subStringonerror)!==-1)===true){
            alert('This name is not allowed !!!');
        }
        else if(($('#input-message').val().indexOf(IveNotAllowed)!==-1) ===true){
            alert('This name is not allowed !!!');
        }
        else if (($('#input-message').val().indexOf(subStringFrame)!==-1)===true){
            alert('This name is not allowed !!!');
        }
        else if (($('#input-message').val().indexOf(subStringStyle)!==-1)===true){
            alert('This name is not allowed !!!');
        }
        else{
            socket.emit('username', $('#input-message').val());
            username = $('#input-message').val().bold();
            $('#input-message').val('');
            $('#input-message').attr('placeholder', 'Your message...');
                console.log(username);
            //create cookie for user:
            document.cookie = "userNameCookie=" + username;
            console.log("ASTA CE O MAI FIIII?" +username);
                console.log("sunt eu la calculator? " + userBoolean);
        }

        //alert(x);
        return false;

    }else{
        var subStringOnError = "<onError";
        var subStringonerror = "<onerror";
        var subStringScript = "<script";
        var subStringFrame = "<iframe";
        var subStringStyle = "<style";
        if ($('#input-message').val() === '')
        {
            alert('Please type something before pressing enter!');
        }
        else if (($('#input-message').val().indexOf(subStringScript)!==-1)===true){
            alert('Do not do that again !!!');
        }
        else if (($('#input-message').val().indexOf(subStringOnError)!==-1)===true){
            alert('Do not do that again !!!');
        }
        else if (($('#input-message').val().indexOf(subStringonerror)!==-1)===true){
            alert('Do not do that again !!!');
        }
        else if (($('#input-message').val().indexOf(subStringFrame)!==-1)===true){
            alert('Do not do that again !!!');
        }
        else if (($('#input-message').val().indexOf(subStringStyle)!==-1)===true){
            alert('Do not do that again !!!');
        }
        else
        {
            function checkTime(i){
                if (i<10){
                    i="0"+i;
                }
                return i;
            }
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
           // var s = today.getSeconds();
            m = checkTime(m);
            //s = checkTime(s);
        socket.emit('chat message',  username + "<br/>" + $('#input-message').val() + "<p class='editTime'>"+h+ ":" + m+"</p>");
        //showTime();
        $('#input-message').val('');


            //      $.getJSON("http://192.168.105.41:3000/rooms.json", function(datarooms) {
            //          // console.log("obiectul venit de pe front este: ");
            //          // console.log(datarooms);
            //
            // $.each(datarooms, function (key, val) {
            //     $('#room').append("<option value=" + val.name + " data-embeddedVideo=" + val.embeddedVideo + ">" + val.name + "</option>");
            // });
            // });

        }
        return false;
    }
});
    // }
    // else
    //     {

            $('.popUpForm').submit(function(){

                    var subStringOnError = "<onError";
                    var subStringonerror = "<onerror";
                    var subStringScript = "<script";
                    var subStringFrame = "<iframe";
                    var subStringStyle = "<style";

                    //socket.emit('usersList', listOfUsers);
                    // var isLetter = !String.IsNullOrEmpty($('#input-message').val()) && Char.IsLetter($('#input-message').val()[0]);
                    // console.log(isLetter);



                    if ($('.popUpInputUser').val() === '')
                    {
                        alert('Please type something before pressing enter!');
                    }
                    else if (($('#input-message').val().indexOf(subStringOnError)!==-1)===true){
                        alert('This name is not allowed !!!');
                    }
                    else if (($('#input-message').val().indexOf(subStringonerror)!==-1)===true){
                        alert('This name is not allowed !!!');
                    }
                    else if (($('.popUpInputUser').val().indexOf(subStringScript)!==-1)===true){
                        alert('Do not do that again !!!');
                    }
                    else if (($('.popUpInputUser').val().indexOf(subStringFrame)!==-1)===true){
                        alert('Do not do that again !!!');
                    }
                    else if (($('.popUpInputUser').val().indexOf(subStringStyle)!==-1)===true){
                        alert('Do not do that again !!!');
                    }
                    else {
                        socket.emit('username', $('.popUpInputUser').val());
                        username = $('.popUpInputUser').val().bold();
                        $('.popUpInputUser').val('');
                       // $('#input-message').attr('placeholder', 'Your message...');
                        console.log(username);
                        //create cookie for user:
                        document.cookie = "userNameCookie=" + username;
                        console.log("sunt eu la calculator? " + userBoolean);
                        $('.pop-outer').fadeOut('slow');


                    return false;
                }


            });


            $('.popUpFormReset').submit(function() {

                var subStringOnError = "<onError";
                var subStringonerror = "<onerror";
                var subStringScript = "<script";
                var subStringFrame = "<iframe";
                var subStringStyle = "<style";

                //socket.emit('usersList', listOfUsers);
                // var isLetter = !String.IsNullOrEmpty($('#input-message').val()) && Char.IsLetter($('#input-message').val()[0]);
                // console.log(isLetter);



                if ($('.popUpInputUserReset').val() === '')
                {
                    alert('Please type something before pressing enter!');
                }
                else if (($('#input-message').val().indexOf(subStringOnError)!==-1)===true){
                    alert('This name is not allowed !!!');
                }
                else if (($('#input-message').val().indexOf(subStringonerror)!==-1)===true){
                    alert('This name is not allowed !!!');
                }
                else if (($('.popUpInputUserReset').val().indexOf(subStringScript)!==-1)===true){
                    alert('Do not do that again !!!');
                }
                else if (($('.popUpInputUserReset').val().indexOf(subStringFrame)!==-1)===true){
                    alert('Do not do that again !!!');
                }
                else if (($('.popUpInputUserReset').val().indexOf(subStringStyle)!==-1)===true){
                    alert('Do not do that again !!!');
                }
                else {
                    socket.emit('usernameReset', $('.popUpInputUserReset').val());
                    username = $('.popUpInputUserReset').val().bold();
                    $('.popUpInputUserReset').val('');
                    // $('#input-message').attr('placeholder', 'Your message...');
                    console.log(username);
                    //create cookie for user:
                    document.cookie = "userNameCookie=" + username;
                    console.log("sunt eu la calculator? " + userBoolean);
                    $('.pop-outer-reset').fadeOut('slow');
                    return false;


                }
                return false;
            });







    socket.on('chat message', function (msg, list) {
        var usernameee = msg.split('<br/>')[0];
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
        //alert(msg);
        console.log('incepe socket on');
            var x = getCookie();

        console.log('SOCKETUUL MEU ESTE: ', x);
            if (x===usernameee)
            {
                //messages coming from me !
                $('#messages').append($('<li class="messagesByMeClass">').html(msg));
                // $('#messages').append($('<li class="messagesByMeClass">').html());
                $('.messagesByMeClass').append(rightArrow);
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

            }else {
                //messages coming from other users !
                $('#messages').append($('<li class="messagesClass">').html(msg));
                $('.messagesClass').append(leftArrow);
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            }
            if(list.length>30){
                $('#messages li').first().remove();
            }
           console.log('lista are: ' + list.length + ' elemente ');


       // }
    });

                // DEMMOO PENTRU maxim 180 CARACTERE PE LI EMIS !!     http://jsfiddle.net/3uhNP/1/
     socket.on('popUpUser', function (usr){
         var x = getCookie();
         var match, userName= "",
             regex = /<b>(.*?)<\/b>/ig;
         while(match = regex.exec(x)){userName += match[1];}
            if (usr === userName){
                $('.userPopUp').fadeIn('slow');
                $('.userPopUp').html(usr);
            }


        });
     socket.on('duplicated user', function(usr){
         $('.pop-outer').fadeIn(400);
     });


    socket.on('userEnter', function (usr){
        $('#messages').append($('<li class="userNotClass">').html(usr + " has CONNECTED to chat....."));
        console.log('userul conectat este:', usr);
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
    });


    socket.on('userRename', function(usr, usrNew){

        $('#messages').append($('<li class="userNotClass">').html("<b>"+ usr+ "</b>"+ " "+ "renamed into: " + " " + "<b>"+ usrNew+ "</b>"));
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
    });



    socket.on('messageDisconnect', function(abc){

        $('#messages').append($('<li class="userNotClass">').html(abc + " has DISCONNECTED from chat !!!"));
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
    });

    socket.on('new history', function (room, emittedMessages, emittedMessagesLength) {
            if (username=== ''){


            $('#messages').append($('<li class="messagesClass">').html(emittedMessages));
            //$('.messagesClass').append(leftArrow);
            $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

        }

        while ($('#messages li').length>30) {

            $('#messages li').first().remove();

            //  emittedMessageLength--;

        }
    });

    // socket.on('usersList', function(list){
    //     console.log('Lista de useri actuali este urmatoarea: ');
    //     // socket.emit('username', $('#input-message').val());
    //     //$('.realTimeUserList').html(list);
    //     for (var i=0; i<list.length; i++){
    //         console.log(list[i]);
    //         list[i] = list[i] + '<br/>';
    //     }
    //     $('.realTimeUserList').html(list);
    // });



    socket.on('message', function(count) {

        $('#countUsers').html(count);

    });
    socket.on('messageM', function(totalUsers, room){
        $('#totalUsr').html(totalUsers);
    });



    showButton.click(function(){
        var link = $(this);
            $('#hideChat').slideToggle(function(){
                if ($(this).is(":visible")) {
                    $('.changeName').html('HIDE');
                    $('.userPopUp').css('float', 'none');
                } else {
                    $('.changeName').html('CHAT');
                    $('.userPopUp').css('float', 'left');
                }
                $('#gratianscroll').mCustomScrollbar("scrollTo",99600);
            });

       // $('#gratianscroll').mCustomScrollbar("scrollTo",99600);


    });

    closePopUp.click(function(){
       $('.pop-outer-reset').fadeOut('slow');
    });

    $('.userPopUp').click(function(){
       $('.pop-outer-reset').fadeToggle('slow');
    });



                            //DEMOOOO pentru HIDE / CHAT : http://jsfiddle.net/9EFNK/7/

    (function($){
        $(window).on("load",function(){
            $(".ScrollStyle").mCustomScrollbar({
                theme: "light-3"
            });
        });
        //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
    })(jQuery);

    function getCookie() {
        var cookieValue = document.cookie.split('userNameCookie=')[1];
        return cookieValue;
    }


    socket.on('limitOfCharacters' , function(usrBoolean, usersPerRoom){
        if (usrBoolean===false){
            $('#input-message').attr("maxlength", 180);
        }
        usrBoolean=true;



    });

            socket.on('allow access rooms', function(usr){
                 $('#room').prop('disabled', false);

        });

            socket.on('change room notification', function(usr, room, newRoom){
                $('#messages').append($('<li class="userNotClass">').html(usr + ' left '+  '<b>' + room + '</b>' + ' and joined ' + '<b>' +newRoom + '</b>'));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

            });

            socket.on('initial message', function(room){
                $('#messages').append($('<li class="messagesClassWelcome">').html("Welcome to " + room + " !!"));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);


            });

            socket.on('history per rooms', function(room, emittedMessages, emittedMessageLength){

                   // $('#messages').append($('<li class="messagesClass">').html("Welcome to " + room + " !!!"));
                   // $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
               // console.log($('#ulForCopy li'));
                // alert('acum vine lista ce vine apenduita gen: ');
                console.log(emittedMessages);
                console.log(emittedMessageLength);


                //alert('Lengthul listei este: ' +$('#messages li').length);


                $('#messages').append($('<li class="messagesClass">').html(emittedMessages));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
                //$('#messages').innerHTML = $('#ulForCopy').innerHTML;

                 if (emittedMessageLength===0){
                         $('#messages li').remove();

                 }else if (emittedMessageLength<30){
                    while ($('#messages li').length>emittedMessageLength){
                        $('#messages li').first().remove();
                    }
                 }
                 else{


                    while ($('#messages li').length>30) {

                        $('#messages li').first().remove();

                        //  emittedMessageLength--;

                    }
                 }

                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

            //socket.emit('initial message', room, emittedMessages, emittedMessageLength);








            });

    socket.on('config new room', function(newRoom, usr, rooms){
        console.log('Camera in care a intrat ' + usr + ' este: ' + newRoom);


        if (newRoom !== rooms[0].name) {

            $('.eyeOpen').hide();
            $('#totalUsr').hide();
        } else {
            $('.eyeOpen').show();
            $('#totalUsr').show();

        }
        // socket.emit('data event', data);
         });
  // });

    socket.on('alert to refresh', function(usr){

            var r = confirm("A new room has been added or edited, please reload");
            if(r)
            {
                window.location.reload();
            }
            else {
                return 0;
            }



    });

    socket.on('real time comparing', function(rooms){
        $.getJSON("http://192.168.105.41:8080//ive/chatRoom/getAllPublicAndActiveChatRooms", function(data) {
            socket.emit('edit rooms depending on DB', data);
        });
    });

     socket.on('roomsForFront', function(rooms){
         $('#room').empty();
        $.getJSON("config.json", function(json){
            console.log(json);


        $.getJSON(json.base_url+"/chatRoom/getAllPublicAndActiveChatRooms", function(data) {
            console.log("obiectul venit de pe front este: ");

            var room = $('#room').val();
        $.each(data, function (key, val) {
            var oldSrc="";
            var newSrc="";
            //if (val.embeddedVideo!==''){

            oldSrc=$(val.embeddedVideo).attr('src');
            var youtube = oldSrc.search(/youtube.com/i);
            var vimeo = oldSrc.search(/vimeo.com/i);
            var firstOrSecond = oldSrc.search(/'?'/i);

            if (youtube>0){
                if (firstOrSecond>0){
                newSrc= oldSrc+"&autoplay=1";
                }else{
                    newSrc= oldSrc+"?autoplay=1";

                }

            }else if (vimeo>0)
                newSrc=oldSrc+"&autoplay=1";
            else {
                newSrc=oldSrc;
            }
            //}

            val.embeddedVideo = val.embeddedVideo.replace(oldSrc, newSrc);

             $('#room').append("<option id='iFrame' value='" + val.name + "' data-embeddedVideo='" + val.embeddedVideo + " ' data-imageURL='" + val.image+"'>" + val.name + "</option>");


            });

            socket.emit('edit rooms depending on DB', data);
            // var title=($('option:selected', room).attr('data-embeddedVideo'));
            // console.log(title[0].setAttribute('autoplay', 'true'));
            //
            changeEnvironment($('option:selected', room).attr('data-embeddedVideo'),$('option:selected', room).attr('data-imageURL'));

            });
        });
    });





    //});
    $('#room').change(function(){
      //  $.getJSON("http://192.168.105.41:3000/rooms.json", function(data) {
        //var codes = data.embeddedCodes;
            //console.log(data.rooms[2].color);
            var room = $('#room').val();
       changeEnvironment($('option:selected', this).attr('data-embeddedVideo'),$('option:selected', this).attr('data-imageURL'));
    console.log('CE ESTE THIS ', +this);


        socket.emit('choose room', $('#room').val());
        console.log('Acum camera este: '+ $('#room').val());
        $(".dropbtn").html($('#room').val());
        $('#messages').append($('<li class="userNotClass">').html('Welcome to room: ' +$('#room').val()));
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
        });
    //});


        changeEnvironment = function (_embeddedLink,_imageURL){

            $('#liveCode').fadeOut('slow');
            setTimeout(function(){ $('#liveCodel').fadeIn('slow')}, 1800);

            //title[0].attr("autoplay", "1");

            if (_embeddedLink==' '){

                // $('#liveCode').css('background-image', 'url("https://streamplaygraphics.com/wp-content/uploads/edd/2016/05/Singularity-Twitch-Offline-Banner-2.png")');
                // $('#liveCode').css('background-size', '100%');
                useImage(_imageURL);
            }
            else{
                $('#liveCodeWrapper').append(_embeddedLink);


            }

        }
        useImage = function(_imageURL){

            //$('#liveCode').css('background-image', 'url("https://streamplaygraphics.com/wp-content/uploads/edd/2016/05/Singularity-Twitch-Offline-Banner-2.png")');
            $('#liveCode').attr("src","");
            $('#liveCode').css('background-image', 'url(' + _imageURL + ')');
            $('#liveCode').css('background-size', '100%');
            $('#liveCode').css('background-repeat', 'no-repeat');
            $('#liveCode').css('background-position', 'center center');
        }





