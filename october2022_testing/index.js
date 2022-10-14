class MyClass {
  add(a, b) {
    if(String(a).length > 20) {
      throw new Error('a is too big');
    }
    return a + b;
  }

  substract(a, b) {
    return a - b;
  }
}
module.exports = MyClass;
