/* 
 * Configuration File
 */

//URL from api to test api resources
//var API_URL = 'http://validate.jsontest.com/';
//var API_URL = 'https://notifier.yeeday.net/api';
var API_URL = 'http://localhost:3000/api';

//Send custom header in your request and response headers
//Used for example to send auth-cookies in headers
var USE_CUSTOM_HEADER = true;
var CUSTOM_HEADER = 'X-Origin-Provider';


//To test login with facebook you need to setup pushmeBaby.com as your local virtualhost
//to obtain login responses , try it!
var LOGIN_FACEBOOK_REDIRECT_URI = "http://pushmeBaby.com:8080/auth/facebook/";
var LOGIN_FACEBOOK_CLIENT_ID    = "723035201084388";
var LOGIN_FACEBOOK_SCOPE        = ["email"];
