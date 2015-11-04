var validateSender = function(messages) {
    return 'toto';
}

$.chat.on('moremessages', function () {
    alert("We want more messages");
});

$.chat.on('newmessage', function (newMessageEvent) {
    var message = Alloy.createModel('Message', {
         content: newMessageEvent.message,
         emitter: 'toto',
         created_at: new Date(2015, 12, 31, 0, 0, 0)
     });
    Alloy.Collections.discussion.add(message);
    newMessageEvent.success(); // Mandatory, to acknowledge sending the message successfully
});

$.chat.init({
    messages: Alloy.Collections.discussion,
    validateSender: validateSender
});