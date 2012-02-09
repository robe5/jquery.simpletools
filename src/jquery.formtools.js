var emailPattern = /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i;
var urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

var Validator = {
  EmailValidator: {
    isValid: function(email){
      return !!email.match(emailPattern);
    }
  },
  UrlValidator: {
    isValid: function(url){
      return !!url.match(urlPattern)
    }
  }
}