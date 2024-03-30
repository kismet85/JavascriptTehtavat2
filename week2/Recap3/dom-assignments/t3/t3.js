window.onload = function() {
  var targetElement = document.getElementById("target");

  var browserInfo = getBrowserInfo();
  var browserInfoText = "Browser: " + browserInfo.name + ", Version: " + browserInfo.version;
  appendParagraph(targetElement, browserInfoText);

  var osInfoText = "Operating System: " + getOSInfo();
  appendParagraph(targetElement, osInfoText);

  var screenInfoText = "Screen Width: " + window.screen.width + ", Height: " + window.screen.height;
  appendParagraph(targetElement, screenInfoText);

  var screenSpaceText = "Available Screen Space: " + window.screen.availWidth + "x" + window.screen.availHeight;
  appendParagraph(targetElement, screenSpaceText);

  var dateTimeText = getCurrentDateTime();
  appendParagraph(targetElement, dateTimeText);
};

function getBrowserInfo() {
  var userAgent = navigator.userAgent;
  var browserName;
  var browserVersion;

  if (userAgent.indexOf("Firefox") !== -1) {
      browserName = "Mozilla Firefox";
      browserVersion = userAgent.match(/Firefox\/(\d+)/)[1];
  } else if (userAgent.indexOf("Chrome") !== -1) {
      browserName = "Google Chrome";
      browserVersion = userAgent.match(/Chrome\/(\d+)/)[1];
  } else if (userAgent.indexOf("Safari") !== -1) {
      browserName = "Apple Safari";
      browserVersion = userAgent.match(/Version\/(\d+)/)[1];
  } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1) {
      browserName = "Internet Explorer";
      browserVersion = userAgent.match(/(MSIE |rv:)(\d+)/)[2];
  } else {
      browserName = "Unknown";
      browserVersion = "Unknown";
  }

  return {
      name: browserName,
      version: browserVersion
  };
}


function getOSInfo() {
  var userAgent = navigator.userAgent;
  var os;

  if (userAgent.indexOf("Windows") !== -1) {
      os = "Windows";
  } else if (userAgent.indexOf("Mac") !== -1) {
      os = "Mac OS";
  } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
  } else if (userAgent.indexOf("Android") !== -1) {
      os = "Android";
  } else if (userAgent.indexOf("iOS") !== -1) {
      os = "iOS";
  } else {
      os = "Unknown";
  }

  return os;
}

function getCurrentDateTime() {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  var locale = 'fi-FI';
  var currentDateTime = new Date().toLocaleDateString(locale, options);

  return currentDateTime;
}

function appendParagraph(targetElement, text) {
  var paragraph = document.createElement("p");
  paragraph.textContent = text;
  targetElement.appendChild(paragraph);
}
