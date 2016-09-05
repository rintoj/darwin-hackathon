(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date(); a = s.createElement(o),
		m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'gaU');

var ga = (function () {

	function startTrackerWithId(gAnalyticsId, success, failure) {
		try {
			var clientId = 'mumbaihack';
			gaU('create', gAnalyticsId, { 'storage': 'none', 'clientId': clientId });
			gaU('set', 'checkProtocolTask', null);
			gaU('set', 'anonymizeIp', true);
			gaU('set', 'forceSSL', true);
			success('new ok');
		} catch (e) {
			console.log(e);
			failure(e);
		}
	}

	function trackView(title, page) {
		gaU('send', 'pageview', { 'title': title, 'page': page });
	}

	function trackEvent(eventCategory, eventAction, eventLabel, eventValue) {
		try {
			if (eventValue == null || eventValue == undefined || eventValue === 'undefined') eventValue = 0;
			gaU('send', 'event', { 'eventCategory': eventCategory, 'eventAction': eventAction, 'eventLabel': eventLabel, 'eventValue': eventValue });
		} catch (e) {
			console.log(e);
		}

		return true;
	}

    // The public API
    return {
		startTrackerWithId: startTrackerWithId,
		trackView: trackView,
		trackEvent: trackEvent
    };
} ());

var gAnalyticsId = 'UA-73002359-1';
var analyticsTracker = null;

function loadGoogleAnalytics() {

	try {
		analyticsTracker = window.ga;
		if (analyticsTracker) {
			try {
				analyticsTracker.startTrackerWithId(gAnalyticsId,
					function (response) {
						analyticsTracker.trackView('TCS Team2 Login', 'login');
					},
					function (error) {
						console.error(error);
					});


			} catch (e) {
				console.error(e);
			}
		}
	} catch (e) {
		console.log(e);
	}

}
var analyticsLoadedVar = false;
function observerAndLoadGoogleAnalytics() {

	setTimeout(function () {
		loadGoogleAnalytics();
	}, 4000);

}
observerAndLoadGoogleAnalytics();


