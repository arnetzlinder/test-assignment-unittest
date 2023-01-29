/**
 *@jest-environment jsdom
 */

import { Todo } from "../ts/models/Todo";
import * as functions from "../ts/functions"

 beforeEach(() => {
    document.body.innerHTML = "";
 });

 describe("addTodo", () => {
    test("should add new todo", () => {
      //Arrange
      let todo : Todo [] = [];
      let toDoText = "Take out the trash";
      let listLength = todo.length;
      //Act
      functions.addTodo(toDoText, todo);

      //Assert
      expect(todo.length).toBe(listLength+1);
      expect(todo[todo.length-1].text).toBe("Take out the trash");
    })
    test("should not add todo", () => {
      //Arrange
      let todo : Todo [] = [];
      let toDoText = "A";
      let listLength = todo.length;
      //Act
      functions.addTodo(toDoText, todo); 
      //Assert
      expect(todo.length).toBe(listLength);
    })
 })

 test("changeTodo status should change", () => {
  //Arrange
  let todo = new Todo("clean kitchen", false);
  //Act
  functions.changeTodo(todo);
  //Assert
  expect(todo.done).toBe(true);
 })

 //Glöm ej test för att testa skriven sorteringsfunktion

 test ("removeAllTodos", () => {
  //Arrange
  let todo : Todo [] = [];
  let todoOne = functions.addTodo("clean kitchen", todo);
  let todoTwo = functions.addTodo("take out trash", todo);
  //Act
  functions.removeAllTodos(todo);
  //Assert
  expect(todo.length).toBe(0);
 })