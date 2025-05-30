function createObject(proto) {
  if (typeof proto !== "object" || proto === null) throw new Error("");
  function F() {}
  F.prototype = proto;
  return new F();
}
// 法二  推荐
function myObjectCreate(proto){
    if(typeof proto !== 'object' || proto === null) throw new Error('')
    const obj = {}
    obj.__proto__ = proto
    return obj
  }

  // 法三
  function MyCreate(obj){
    function fn(){}
    fn.prototype = obj
    fn.prototype.construct = fn
    return new fn()
}  
// Example usage
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};



const anotherPerson = createObject(person);
anotherPerson.firstName = "Jane";
console.log(anotherPerson.fullName()); // Output: "Jane Doe"
