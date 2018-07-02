import ToDoItem from "../src/front/Components/ToDoItem";

describe("ToDoItem", function() {
var itemID = 88888;
var statusLabel = 'done';
    it("first dummy test", function() {
        var a = 12;
        expect(a).toBe(12);
    });

    it("getTemplate works",function() {
        var templateString = ToDoItem.getTemplate();
        expect(templateString).toContain(`<input type='checkbox' name="todo_item_id" id=""/>`);
    });


    it("check if <todo-item> is valid html element",function() {
        var todoItem = document.createElement('todo-item');
        expect(todoItem instanceof HTMLElement).toBe(true);


    });

    it("check if Can Edit", function(done){
       ToDoItem.saveItem("ova e test naslov za ovakvoto", itemID)
            .then(response => {
                expect(response.ok).toBe(true);
            });
        done();
    });
    it("check if can alter status", function(done){
        ToDoItem.saveItem("ova e test naslov za ovakvoto",itemID,statusLabel)
            .then(response => {
                expect(response.ok).toBe(true);
            });
        done();
    });
    //check if can edit
    //check if can alter status
    //check if can delete
});