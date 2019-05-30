var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "prompt",
      type: "list",
      message: "Would you like to [BUY] an auction or [VIEW] on an auction?",
      choices: ["BUY", "VIEW", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.prompt === "BUY") {
        buy();
      }
      else if(answer.prompt === "VIEW") {
        view();
      } else{
        connection.end();
      }
    });
}


function buy(){
  console.log("Feature coming soon!")
  start();
}
function view(){
  console.log("Feature coming soon!")
  start();
}

