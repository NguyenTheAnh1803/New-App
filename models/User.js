"use strict";
// Class User
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 20,
    category = "Business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.catergory = category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
