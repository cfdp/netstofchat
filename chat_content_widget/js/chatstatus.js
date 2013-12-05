/* This script is called when the connection to the chat server (now.js) has been established */

(function ($) {
  var chatStatus = {};

  // The following callback is called by the server in order to
  // advertise its status.
  now.updateStatus = function (attributes) {
    chatStatus = attributes;
    $(window).trigger('opekaChatStatusUpdate', [attributes]);
  };

  // When the DOM is ready, set up the widget.
  $(function () {
    var statusTab = $('.status-tab'),
        pairButton = $('#join-pair-chat'),
        statusInfo = $('.status-info'),
        brevkasser = $('.brevkasser');

    // Updates the actual status text.
    var updateDisplay = function (attributes) {
      // If there are any active one-to-one rooms.
      if (chatStatus.rooms && chatStatus.rooms.pair.active > 0) {

        statusTab.css("background","url('http://netstofchat.cybhus.dk/sites/default/files/chat-open-horizontal.png') no-repeat #85b429");

        pairButton.css("display","inline-block");
        statusInfo.hide();
        brevkasser.hide();

      // If not, check if there are any active group rooms.
      } else if (chatStatus.rooms && chatStatus.rooms.pair.full > 0) {
        statusTab.css("background","url('http://netstofchat.cybhus.dk/sites/default/files/chat-busy-horizontal.png') no-repeat #ee9200");

        pairButton.hide();
        brevkasser.show();
        statusInfo.show().html("Chatten er optaget. Klik forbi brevkasserne og stil dit sp&oslash;rgsm&aring;l dér, eller se om der ligger et svar du kan bruge.");

      } else {
        statusTab.css("background","url('http://netstofchat.cybhus.dk/sites/default/files/chat-busy-horizontal.png') no-repeat #ee9200");

        pairButton.hide();
        brevkasser.show();
        statusInfo.show();

        statusInfo.html("Chatten er &aring;ben <strong>onsdag kl. 10-13 & igen 18-21.</strong> Klik forbi brevkasserne og stil dit sp&oslash;rgsm&aring;l der, eller se om der ligger et svar du kan bruge.");
      };

     };
    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);

    // When the user clicks the button, ask the chat server to join a room.
    pairButton.click(function () {
	if(!$.browser.opera){
		var w = open_window('_blank','http://netstofchat.cybhus.dk/opeka', 1000, 700);
	}else{
		window.parent.location = "http://netstof.dk/chat-on-opera";
	}

      now.getDirectSignInURL('pair', function (signInURL) {
        if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
            w.close();
            window.parent.location ="http://netstof.dk/brevkasse";
           }
        else {
			     w.location = signInURL;
           }
      });
    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// Build pop-up window
function open_window(window_name,file_name,width,height) {
  parameters = "width=" + width;
  parameters = parameters + ",height=" + height;
  parameters = parameters + ",status=no";
  parameters = parameters + ",resizable=no";
  parameters = parameters + ",scrollbars=no";
  parameters = parameters + ",menubar=no";
  parameters = parameters + ",toolbar=no";
  parameters = parameters + ",directories=no";
  parameters = parameters + ",location=no";

  vindue = window.open(file_name,window_name,parameters);
  return vindue;
}
