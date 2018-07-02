// import request from "../node_modules/request";
import ToDoApp from "../src/front/Components/ToDoApp";

describe("To Do App", function() {
    // var request = require("request");
    // var request = new request();
    var base_url = "http://localhost:3000/"




   it("dummy test , for the number", function() {
        var a = 12;
            expect(a).toBe(12);
    });
    //
    // it("returns status code 200", function() {
    //         request.get(base_url+"todo_list", function(error, response, body) {
    //             expect(response.statusCode).toBe(200);
    //
    //         });
    //     });
    //
    // it("returns status code 404", function() {
    //     request.get(base_url+"todo_listssss", function(error, response, body) {
    //         expect(response.statusCode).toBe(405);
    //
    //     });
    // });

    it("initialize the ToDoApp", function() {
        var theDoToApp = new ToDoApp();


         expect(true).toBeTruthy();

    })

});