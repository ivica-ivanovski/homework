'use strict';
import ToDoItem from './ToDoItem';
import "../style.css";

// On load start the app.*
window.addEventListener('load', function() {
   window.ToDoApp = new ToDoApp();
});


export default class ToDoApp {
    constructor() {
       this.todoContainer = document.getElementById('theToList');
       this.toDoInput = document.getElementById('the_todo_input');

       this.toDoInput.addEventListener('keyup', (e) =>{
            if(e.keyCode === 13){
               this.createNewItem();
           }
       });
       this.allItems = [];
       this.getAllItems();
    }

    getAllItems() {
        this.todoContainer.innerHTML = '';
        fetch('http://localhost:3000/todo_list').then((data) => data.json())
            .then(
                (jsonData) => jsonData.map(
                    (item) => {
                        this.displayToDoItem(item);
                    }
                )
            );

    }
    displayToDoItem(item) {
        let todoItem = document.createElement('todo-item');

        todoItem.innerHtml = ToDoItem.getTemplate();
        let theItemTitle = todoItem.querySelector('.item_title');

        if( typeof item['status'] !== 'undefined' ) {
            theItemTitle.setAttribute('class','item_title itemDone');
            todoItem.querySelector('[name="todo_item_id"]').setAttribute('checked','checked');
        }

        theItemTitle.innerHTML = item['title'];
        todoItem.setTheId(item['id']);


        this.allItems.push(todoItem);
        this.todoContainer.prepend(todoItem);
    }

    createNewItem(){

        let todoTitle = this.toDoInput.value;

        if(todoTitle.length == 0 ) {
            alert('cannot be empty');
            return false;
        }

        ToDoItem.saveItem(todoTitle)
            .then(response  => response.json())
            .then(jsonResponse => {
                this.displayToDoItem(jsonResponse);
                this.toDoInput.value = '';
            })


    }
}