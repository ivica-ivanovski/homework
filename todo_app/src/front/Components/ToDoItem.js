export default class ToDoItem extends HTMLElement{
    //
    //
    constructor(){
        super();
    }
    // Fires when an instance of the element is created.
    createdCallback() {
        this.innerHTML = ToDoItem.getTemplate();
        this.deleteBtn = this.querySelector('.delete');
        this.editBtn = this.querySelector('.edit');
        this.idInput = this.querySelector('[name="todo_item_id"]');
        this.itemEdit = this.querySelector('[name="item_title_edit"]');

        this.itemTitle = this.querySelector('.item_title');



        this.deleteBtn.addEventListener('click',() => this.deleteToDoItem());
        this.editBtn.addEventListener('click',() => this.editToDoItem());

        this.idInput.addEventListener('click', (e) => this.markAsDone(e));

        this.itemEdit.addEventListener('keyup',(e) =>{
            if(e.keyCode === 13){

                ToDoItem.saveItem(this.itemEdit.value , this.idInput.id)
                    .then(response  => {
                    if(response.ok) {
                        window.ToDoApp.getAllItems();
                    }
                })

            }
        });


    };

    setTheId(id){
        this.idInput.setAttribute('id',id);
    }

    deleteToDoItem() {
        if(confirm('delete this item, you sure?')){
            fetch("http://localhost:3000/todo_list/"+this.idInput.id, {
                method: 'DELETE'
            })
                .then(response  => {if(response.ok) {
                    this.parentNode.removeChild(this)
                }
                });

        }

    }

    editToDoItem(){

        this.itemEdit.value = this.querySelector('.item_title').innerHTML;

        this.itemEdit.style = "display:inline-block";
        this.itemEdit.focus();
        this.itemTitle.style = "display:none";
    }


    markAsDone(e){
        if(!confirm('Change status of the item.')) {
            e.preventDefault();
            return false;
        }
        let status;
        if(e.target.checked){
            status = 'done';
        } else{

            status = undefined;
        }

        ToDoItem.saveItem(this.querySelector('.item_title').innerHTML , this.idInput.id, status)
            .then(response  => {
                if(response.ok) {
                    window.ToDoApp.getAllItems();
                }
            })
    }


    static getTemplate() {
        return `<input type='checkbox' name="todo_item_id" id=""/>
                <h2 class="item_title">The Title</h2>
                <input type="text" name="item_title_edit" class="item_title_edit"/>
                <button class="edit" title="edit this element">edit</button>
                <button class="delete" title="delete this element">delete</button>`;
    }



    static saveItem(...theArgs){
        let [title, id, status ] = theArgs;

        let url = (typeof id === 'undefined' ) ? "todo_list" : "todo_list/"+id;
        let method = (typeof id === 'undefined' ) ? "POST" : "PUT";
        return fetch("http://localhost:3000/"+url, {
            body: JSON.stringify({title: title, id: id, status: status}),
            method: method,
            headers: {
                'content-type': 'application/json'
            },
        })

    }
}
document.registerElement('todo-item',ToDoItem);