// JScript File
var Profile = require("./profile.js");
var rendener = require("./rendener.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {
if (request.url === "/") {
    if(request.method.toLowerCase() === "get")
    {
        response.writeHead(200, commonHeaders);
        rendener.view('header', {}, response);
        rendener.view('search', {}, response);
        rendener.view('footer', {}, response);
        response.end();
    }
    else
    {
        request.on("data", function(postBody){
            var query = querystring.parse(postBody.toString());
            response.writeHead(303, {'Location': "/" + query.username});
            response.end();
        });        
    }
    }
};

function user(request, response) {
  console.log(request.url);

  var username = request.url.replace("/", "");
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    rendener.view('header', {}, response);


    var studentProfile = new Profile(username);

    studentProfile.on("end", function(profileJSON) {
      var values = {
        avartarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }

      rendener.view('profile', values, response);
      rendener.view('footer', {}, response); 
      console.log(values.username + " has " + values.badges + " badges");
      response.end();
    });

    studentProfile.on("error", function(error) {
      rendener.view('error', { error_message: error.message }, response);
      rendener.view('search', {}, response);
      rendener.view('footer', {}, response);
      response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;