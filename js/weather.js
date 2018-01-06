/// Simple weather app js

/* Client ID (Consumer Key)
dj0yJmk9UXU4QWF1dEU4TnBWJmQ9WVdrOU5rWldUamRoTkdFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zYQ--
Client Secret (Consumer Secret)
6ef17f9a54e37eb9d92212b775b4c04b3037630d */
/* Client ID(Consumer Key)
dj0yJmk9REw1VWRLMTlaZXcyJmQ9WVdrOVdURTNiell5TjJzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1iNw--
Client Secret(Consumer Secret)
c458b33c56b0d87f9866c84110568d19a5ac1263 */

let link = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22raleigh%2C%20nc%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

let request = new HTML request()