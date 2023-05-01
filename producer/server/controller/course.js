class Course {
  id;
  name;
  code;
  active;
  method;
  constructor(body, method) {
    this.id = body.id;
    this.name = body.name;
    this.code = body.code;
    this.active = body.active;
    this.method = method;
  }
}

module.exports = Course;
