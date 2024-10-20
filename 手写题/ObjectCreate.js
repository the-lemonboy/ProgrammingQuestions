function createObject(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  }
  
  // Example usage
  const person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  };
  
  const anotherPerson = createObject(person);
  anotherPerson.firstName = 'Jane';
  console.log(anotherPerson.fullName()); // Output: "Jane Doe"