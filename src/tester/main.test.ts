/**
 *@jest-environment jsdom
 */

import { Todo } from "../ts/models/Todo";
import * as main from "../ts/main";
import * as functions from "../ts/functions";

beforeEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
});   

/********************************************************
 *              Test for createNewToDo                  *
 ********************************************************/
describe("tests for createNewTodo", () => {
    test("should test if addTodo was called and todo added to DOM", () => {
        //Arrange
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let todoText: string = "testtext";
        let todos: Todo[] = [];

        //Act
        main.createNewTodo(todoText, todos);
        
        let todosCheck = document.querySelector("#todos")?.innerHTML;
        let todoLiText = `<li class="todo__text">testtext</li>`;
        let addition = document.querySelector(".todo__text")?.innerHTML;

        // //Assert
        expect(addition).toBe('testtext');
        expect(todosCheck).toBe(todoLiText);
    });

    test("Test if displayError has been called", () => {
        //Arrange
        document.body.innerHTML = `<div id="error" class="error"></div>`;
        let todoText = "aa";
        let todo = [new Todo ("aa", false)];

        //Act
        main.createNewTodo(todoText, todo);
        let result = document.querySelector("#error")?.classList.contains("show");

        //Assert
        expect(result).toBe(true);
    });
});
/********************************************************
 *              Test for createHTML                     *
 ********************************************************/
describe("Testing the createHtml function", () => {
    test( "Is createHTML rendering correctly?", () => {
        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
        let renderedTodoList = `<li class="todo__text--done todo__text">test</li>`;
        let list : Todo[] = [{text: 'test', done: true}];
        //Act
        main.createHtml(list);
        let result = document.querySelector("#todos")?.innerHTML;

        //Assert
        expect(result).toEqual(renderedTodoList);

    });
    test('testing that fetching from localStorage is done correctly', () => {

        //Arrange
        let todo: Todo[] = [{text: "testing", done: true}];
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`

        //Act
        main.createHtml(todo)
        let localStorageTodo = JSON.parse(localStorage.getItem("todos") || "[]");

        //Assert
        expect(localStorageTodo.length).toBe(1);

    });
});

/********************************************************
 *              Test for toogleTodos                    *
 ********************************************************/
describe("tests for toggleTodos", () => {
    test("should call changeTodo", () => {
        //Arrange
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let spyChangeToDo = jest.spyOn(functions, "changeTodo").mockReturnValue();
        
        //Act
        main.toggleTodo({text: "take out the trash", done: true});

        //Assert
        expect(spyChangeToDo).toHaveBeenCalled();
        spyChangeToDo.mockRestore();
    });
    test ("should call createHtml", () => {
        //Arrange
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        // let todo = Todo: {text: "take out the trash", done: false};
        //Act
        main.toggleTodo({text: "take out the trash", done: true});

        //Assert
        expect(spyCreateHtml).toHaveBeenCalled();
        spyCreateHtml.mockRestore();
    });
});

/********************************************************
 *              Test for displayError                   *
 ********************************************************/

 describe("tests for displayError", () => {
    test ("should add class to div", () => {
        //Arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <ul class="todosContainer"></ul>
        <div id="error" class = "error"></div>
        `;

        //Act
        main.displayError(errorText, true);

        //Assert
        let result = document.getElementById('error') as HTMLDivElement;
        expect(result.classList.contains('show')).toBe(true);
    });

    test ("should remove class from div", () => {
        //Arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <ul class="todosContainer"></ul>
        <div id="error" class = "error"></div>
        `;
    
        //Act
        main.displayError(errorText, false);
    
        //Assert
        let result = document.getElementById('error') as HTMLDivElement;
        expect(result.classList.contains('show')).toBe(false);
    });
 });

 /********************************************************
 *              Test for clearTodos                      *
 ********************************************************/

 describe ("tests for clearTodos", () => {
    test ("Should trigger removeAllTodos", () => {
        //Arrange
        let todos: Todo[] = [];
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let spyRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        //Act
        main.clearTodos([]);
        //Assert
        expect(spyRemoveAllTodos).toHaveBeenCalled();
        spyRemoveAllTodos.mockRestore();
    });
    test ( "Should trigger createHtml", () => {
        //Arrange
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `;
        let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        //Act
        main.clearTodos([]);
        //Assert
        expect(spyCreateHtml).toHaveBeenCalled();
        spyCreateHtml.mockRestore();
    });
 });


//  describe ("tests for events", () => {
// 	let events = {} as Function;
//     beforeEach(() => {
//     })

//     test ("Should test the first event", () => {
//         //Arrange
//         jest.spyOn(main, 'click');
//         main.document.
//     });
 
//  });