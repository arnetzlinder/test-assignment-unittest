/**
 *@jest-environment jsdom
 */

 import { displayError } from "../ts/main";
 import { Todo } from "../ts/models/Todo";
 import * as main from "../ts/main";
import * as functions from "../ts/functions"

 beforeEach(() => {
    document.body.innerHTML = "";
 });

 afterEach(() => {
    jest.restoreAllMocks();});

 describe("tests for displayError", () => {
    test ("should add class to div", () => {
        //arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <ul class="todosContainer"></ul>
        <div id="error" class = "error"></div>
        `;

        //act
            displayError(errorText, true);

        //assert
        let result = document.getElementById('error')?.innerHTML;
        expect(result).toBe(errorText);
    })

    test ("should remove class from div", () => {
        //arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <ul class="todosContainer"></ul>
        <div id="error" class = "error"></div>
        `;
    
        //act
            displayError(errorText, false);
    
        //assert
        let result = document.getElementById('error') as HTMLDivElement;
        expect(result.classList.contains('show')).toBe(false);
    })
    
 })

 describe ("tests for clearTodos", () => {
    test ("Should trigger removeAllTodos & createHtml", () => {
        //Arrange
        let todos: Todo[] = [];
        let spyRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
        let spyCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
        //Act
        main.clearTodos([]);
        //Assert
        expect(spyRemoveAllTodos).toBeCalled();
        expect(spyCreateHtml).toBeCalled();
    })

 });