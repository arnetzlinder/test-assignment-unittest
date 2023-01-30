/**
 *@jest-environment jsdom
 */

import { Todo } from "../ts/models/Todo";
import * as functions from "../ts/functions"

 beforeEach(() => {
    document.body.innerHTML = "";
 });

 /********************************************************
 *              Test for addTodos                        *
 ********************************************************/

 describe("addTodo", () => {
    test("should add new todo", () => {
      //Arrange
      let todo : Todo [] = [];
      const toDoText = "Take out the trash";
      const listLength = todo.length;
      //Act
      functions.addTodo(toDoText, todo);

      //Assert
      expect(todo.length).toBe(listLength+1);
      expect(todo[todo.length-1].text).toBe("Take out the trash");
    })
    test("should not add todo", () => {
      //Arrange
      let todo : Todo [] = [];
      const toDoText = "A";
      const listLength = todo.length;
      //Act
      functions.addTodo(toDoText, todo); 
      //Assert
      expect(todo.length).toBe(listLength);
    })
 })

/********************************************************
*              Test for sortAllTodosByDescription          *
********************************************************/
describe("tests for sortAllTodosByDescription", () => {
  test("if array sorted?", () => {
    //Assert
    let todosArray : Todo [] = [new Todo("take out trash", true), new Todo("clean kitchen", true), new Todo("wash laundry", false)];

    //Act
    functions.sortAllTodosByDescription(todosArray);

    //Assert
    expect(todosArray[1].text).toBe("take out trash");
  })
})

/********************************************************
*              Test for changeTodo                      *
********************************************************/

 test("changeTodo status should change", () => {
  //Arrange
  let todo = new Todo("clean kitchen", false);
  //Act
  functions.changeTodo(todo);
  //Assert
  expect(todo.done).toBe(true);
 })

/********************************************************
*              Test for removeAllTodos                  *
********************************************************/

 test ("removeAllTodos", () => {
  //Arrange
  let todo : Todo [] = [];
  const todoOne = functions.addTodo("clean kitchen", todo);
  const todoTwo = functions.addTodo("take out trash", todo);
  //Act
  functions.removeAllTodos(todo);
  //Assert
  expect(todo.length).toBe(0);
 })