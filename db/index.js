const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * from department"
        )
    }

    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT * from employee"
        )
    }
}

module.exports = new DB(connection);