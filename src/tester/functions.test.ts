/**
 *@jest-environment jsdom
 */

//  import { addTodo } from "../ts/functions";
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
    test("should not add todo"), () => {
      //Arrange
      let todo : Todo [] = [];
      let toDoText = "";
      //dubbelkolla varför det ej går igenom med en bokstav
      let listLength = todo.length;
      //Act
      functions.addTodo(toDoText, todo); 
      //Assert
      expect(todo.length).toBe(listLength);
    }
 })

 test("changeTodo from false to true"), () => {
  //Arrange
  let todo = new Todo("clean kitchen", false);
  //Act
  functions.changeTodo(todo);
  //Assert
  expect(todo.done).toBe(true);
 }