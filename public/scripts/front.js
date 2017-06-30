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
var checkBoolean = true;

//Main form !!!
$('.formShow').submit(function(){
    $('.ScrollStyle').animate({scrollTop: $('.ScrollStyle').height()}, 99600);
    //Case 1: the user is not logged
    if (username === '')
    {

        var subStringOnError = "<onError";
        var subStringonerror = "<onerror";
        var subStringScript = "<script";
        var subStringFrame = "<iframe";
        var subStringStyle = "<style";
        var IveNotAllowed = /(ive)/gi;

        //Tags not allowed in messages !
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
            //Send the username value to back-end event
            socket.emit('username', $('#input-message').val());
            username = $('#input-message').val().bold();
            $('#input-message').val('');
            $('#input-message').attr('placeholder', 'Your message...');

            //create cookie for user:
            document.cookie = "userNameCookie=" + username;
        }

        //alert(x);
        return false;

        //Case 2: the user is logged
    }else{

        var subStringOnError = "<onError";
        var subStringonerror = "<onerror";
        var subStringScript = "<script";
        var subStringFrame = "<iframe";
        var subStringStyle = "<style";

        //Tags not allowed in messages !
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

            //Show time for messages !
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
           // var s = today.getSeconds();
            m = checkTime(m);

            //Send the message to the back-end event !
        socket.emit('chat message',  username + "<br/>" + $('#input-message').val() + "<p class='editTime'>"+h+ ":" + m+"</p>");
        //showTime();
        $('#input-message').val('');
        }
        return false;
    }
});

        //Form if there are two users with the same username
            $('.popUpForm').submit(function(){

                    var subStringOnError = "<onError";
                    var subStringonerror = "<onerror";
                    var subStringScript = "<script";
                    var subStringFrame = "<iframe";
                    var subStringStyle = "<style";

                //Tags not allowed in messages !
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
                        //create cookie for user:
                        document.cookie = "userNameCookie=" + username;
                        $('.pop-outer').fadeOut('slow');

                    return false;
                }


            });

            //Form if the user wants to change his username
            $('.popUpFormReset').submit(function() {

                var subStringOnError = "<onError";
                var subStringonerror = "<onerror";
                var subStringScript = "<script";
                var subStringFrame = "<iframe";
                var subStringStyle = "<style";

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
                    //create cookie for user:
                    document.cookie = "userNameCookie=" + username;
                    $('.pop-outer-reset').fadeOut('slow');
                    return false;


                }
                return false;
            });

    //Front-end event to display messages depending according to who is typing

    socket.on('chat message', function (msg, list) {
        var usernameee = msg.split('<br/>')[0];
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

            var x = getCookie();

            if (x===usernameee)
            {
                //Messages coming from me !
                $('#messages').append($('<li class="messagesByMeClass">').html(msg));
                $('.messagesByMeClass').append(rightArrow);
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

            }else {
                //Messages coming from other users !
                $('#messages').append($('<li class="messagesClass">').html(msg));
                $('.messagesClass').append(leftArrow);
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            }
            //Remove the first message when the length of the list is 30.
            if(list.length>30){
                $('#messages li').first().remove();
            }



    });

    //Front-end event who allows the user to rechange the username
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

    //Front-end event in case that there are 2 users with the same username
     socket.on('duplicated user', function(usr){
         $('.pop-outer').fadeIn(400);
     });

    //Front-end event to display who connected to chat !
     socket.on('userEnter', function (usr){

         $('#messages').append($('<li class="userNotClass">').html(usr + " has CONNECTED to chat....."));
         $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
     });

      //Front-end event to display who changed his username
     socket.on('userRename', function(usr, usrNew){

         $('#messages').append($('<li class="userNotClass">').html("<b>"+ usr+ "</b>"+ " "+ "renamed into: " + " " + "<b>"+ usrNew+ "</b>"));
         $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
     });


    //Front-end event to display who disconnected from chat
    socket.on('messageDisconnect', function(abc){

        $('#messages').append($('<li class="userNotClass">').html(abc + " has DISCONNECTED from chat !!!"));
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
    });

    //Front-end to display the history to a new connected user
    socket.on('new history', function (room, emittedMessages, emittedMessagesLength) {
            if (username=== ''){

                $('#messages').append($('<li class="messagesClass">').html(emittedMessages));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            }

            //Remove first emitted message when the list reaches the length=30
            while ($('#messages li').length>30) {
                $('#messages li').first().remove();
            }
    });

    //TODO this front-end event can be used to display a real time list with connected users !
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


    //Front-end event to display how many users are logged with username
    socket.on('message', function(count) {
        $('#countUsers').html(count);
    });

    //Front-end event to display how many users are logged without username
    socket.on('messageM', function(totalUsers, room){
        $('#totalUsr').html(totalUsers);
    });


    //Chat button - visibility function
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
    });

    //Quit button function for popups
    closePopUp.click(function(){
       $('.pop-outer-reset').fadeOut('slow');
    });

    $('.userPopUp').click(function(){
       $('.pop-outer-reset').fadeToggle('slow');
    });

    //function for the Custom ScrollBar
    (function($){
        $(window).on("load",function(){
            $(".ScrollStyle").mCustomScrollbar({
                theme: "light-3"
            });
        });
    })(jQuery);

    //Function to get cookie for users
    function getCookie() {
        var cookieValue = document.cookie.split('userNameCookie=')[1];
        return cookieValue;
    }

    //Front-end event to set the limit of characters on username and messages !
    socket.on('limitOfCharacters' , function(usrBoolean, usersPerRoom){
        if (usrBoolean===false){
            $('#input-message').attr("maxlength", 180);
        }
        usrBoolean=true;



    });

    //Front-end event to enable the select for the users who have username
    socket.on('allow access rooms', function(roomsl){
        if (roomsl<=1){
            $('#room').attr('disabled', true);
        }else{
            $('#room').attr('disabled', false);
            }
        });

    //Front-end event to display who left a room and joined another one
    socket.on('change room notification', function(usr, room, newRoom){
                $('#messages').append($('<li class="userNotClass">').html(usr + ' left '+  '<b>' + room + '</b>' + ' and joined ' + '<b>' +newRoom + '</b>'));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
        });

    //Front-end event to display a welcome message to the user who joined a new room
    socket.on('initial message', function(room){
                $('#messages').append($('<li class="messagesClassWelcome">').html("Welcome to " + room + " !!"));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
        });


    //Front-end event to display the history for each room
    socket.on('history per rooms', function(room, emittedMessages, emittedMessageLength){

                $('#messages').append($('<li class="messagesClass">').html(emittedMessages));
                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);

                 if (emittedMessageLength===0){
                         $('#messages li').remove();

                 }
                 else if (emittedMessageLength<30){
                    while ($('#messages li').length>emittedMessageLength){
                        $('#messages li').first().remove();
                    }
                 }
                 else{
                     while ($('#messages li').length>30) {
                         $('#messages li').first().remove();
                     }
                 }

                $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            });

    //Front-end event
    socket.on('config new room', function(newRoom, usr, rooms){

        if (newRoom !== rooms[0].name) {
            $('.eyeOpen').hide();
            $('#totalUsr').hide();
        } else {
            $('.eyeOpen').show();
            $('#totalUsr').show();
        }
         });

    //Front-end event who announce with an alert when a new room has been added or eddited !
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

    //Front-end event who can compare the back-end DB with the front-end DC in real time (with back-end events)
    socket.on('real time comparing', function(rooms){
        $.getJSON("config.json", function(json) {
            $.getJSON(json.base_url + "/chatRoom/getAllPublicAndActiveChatRooms", function (data) {
                socket.emit('edit rooms depending on DB', data);
            });
        });
    });

    //Front-end event to display the iframe for each room depending on DB
     socket.on('roomsForFront', function(rooms){
         $('#room').empty();

         $.getJSON("config.json", function(json){

            $.getJSON(json.base_url+"/chatRoom/getAllPublicAndActiveChatRooms", function(data) {

                var room = $('#room').val();
                var counterRooms=0;

        $.each(data, function (key, val) {
            counterRooms++;
            var oldSrc="";
            var newSrc="";
            oldSrc=$(val.embeddedVideo).attr('src');

            var youtube = oldSrc.search(/youtube.com/i);
            var vimeo = oldSrc.search(/vimeo.com/i);
            var firstOrSecond = oldSrc.search(/\?/i);

            if ((youtube>=0) && (firstOrSecond>=0)){
                    newSrc=oldSrc+"&autoplay=1";
            }
            else if((youtube>=0) && (firstOrSecond<0)){
                    newSrc=oldSrc+"?autoplay=1";
            }
            else {
                newSrc=oldSrc+"&autoplay=1";
            }

            var iframeHTML=$(val.embeddedVideo).attr('src',newSrc).prop('outerHTML');
            $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            $('#room').append("<option  id="+counterRooms+" value='" + val.name + "' data-embeddedVideo='" + iframeHTML + " ' data-imageURL='" + val.image+"'>" + val.name + "</option>");
        });


            var newQuery = function (){
                var baseURL = window.location.href;
                if (baseURL.indexOf('#')!==-1){
                    baseURL = baseURL.substring(0, baseURL.indexOf('#'));
                    var s =window.location.href;
                    s = s.substring(s.indexOf('=')+1, s.length);
                }
                if (s!== undefined && s!== ''){
                    $('#room').val(s);
                    socket.emit('choose room', $('#room').val());
                }
            }();

                changeEnvironment($('option:selected', room).attr('data-embeddedVideo'),$('option:selected', room).attr('data-imageURL'));
            $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
            });
        });
    });

    //Function for changing the room
    $('#room').change(function(e){
        var room = $('#room').val();

        //adding params to URL
        var  _url = window.location.href;
        _url = _url.substring(0, _url.indexOf('#'));
        _url = _url + "#room=" + room;
        window.location.href = _url;
        //end adding params
        changeEnvironment($('option:selected', this).attr('data-embeddedVideo'),$('option:selected', this).attr('data-imageURL'));


        socket.emit('choose room', $('#room').val());
        $(".dropbtn").html($('#room').val());
        $('#messages').append($('<li class="userNotClass">').html('Welcome to room: ' +$('#room').val()));
        $('.ScrollStyle').mCustomScrollbar("scrollTo",99600);
        });

    changeEnvironment = function (_embeddedLink,_imageURL){
            $('#liveCode').fadeOut('slow');
            setTimeout(function(){ $('#liveCodel').fadeIn('slow')}, 1800);
                if (_embeddedLink==' '){
                    useImage(_imageURL);
                 }else{
                    $('#liveCodeWrapper').empty();
                    $('#liveCodeWrapper').append(_embeddedLink);
                }
    };
        useImage = function(_imageURL){
            $('#liveCode').attr("src","");
            $('#liveCode').css('background-image', 'url(' + _imageURL + ')');
            $('#liveCode').css('background-size', '100%');
            $('#liveCode').css('background-repeat', 'no-repeat');
            $('#liveCode').css('background-position', 'center center');
        };





