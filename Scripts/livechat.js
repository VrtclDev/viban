function new_websocket(url, ready_callback, message_callback) {
    let socket = new WebSocket(url);
    socket.onopen = function() {
        console.log('WebSocket is now open');
        if (ready_callback !== undefined) ready_callback(this);
    }
    socket.onerror = function(e) {
        console.error('WebSocket error');
        console.error(e);
    }
    socket.onmessage = function(response) {
        if (message_callback !== undefined) message_callback(response);
    }

    return socket;
}

new_websocket('wss://public.node.jungletv.live/ws', function(socket) {
    let params = {
      action: "subscribe",
      topic: "confirmation",
      options: {
      all_local_accounts: true,
      accounts: [
      liveChat
      ]}
    }
    socket.send(JSON.stringify(params));
}, function(response) {
    let data = JSON.parse(response.data);
    if (data.topic != 'confirmation') return;
    let message = data.message;
    message_handler(message);
});
function chat(msg) {
  uploadPost(makeComment(msg), liveChat)
}
function message_handler(message) {
  console.log(message);
}




var consoleLine = "<p class=\"console-line\"></p>";
 
var console = {
    log: function (text) {
        var d = document.createElement('p');
        d.classList.add('console-line');
        d.textContent = text;
        window.console_log.appendChild(d);
    }
};



// Example operation

var counter = 3;
function myOperation() {
	var deferred = Q.defer();
	Q.delay(10).then(function() {
		counter -= 1;
		if (counter == 0) {
			console.log("myOperation: OK")
			deferred.resolve(123);
		} else {
			console.log("myOperation: Failed")
			deferred.reject(new Error("not yet"));
		}
	});
	return deferred.promise;
}

RepeatUntilSuccess(myOperation, 500).then(function(value) {
    console.log("Wow, success: " + value);
})
