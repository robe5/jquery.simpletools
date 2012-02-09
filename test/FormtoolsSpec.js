
describe('EmailValidator',function(){
  var validator;

  beforeEach(function(){
    validator = Validator.EmailValidator;
  });

  it('validate right email',function(){
    var valid = validator.isValid("jose@axtro.es")
    expect(valid).toBe(true);
  });

  it('does not validate wrong email', function(){
    var valid = validator.isValid("joseaxtro.es")
    expect(valid).toBe(false)
  });
});

describe('UrlValidator', function(){
  var validator;
  beforeEach(function(){
    validator = Validator.UrlValidator;
  });

  it('validate right url',function(){
    var valid = validator.isValid("http://google.com")
    expect(valid).toBe(true);
  });

  it('does not validate wrong url', function(){
    var valid = validator.isValid("castaña")
    expect(valid).toBe(false)
  });
});