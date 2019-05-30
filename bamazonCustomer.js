var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function (err) {
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
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.prompt === "BUY") {
        buy();
      }
      else if (answer.prompt === "VIEW") {
        view();
      } else {
        connection.end();
      }
    });
}


function buy() {
  console.log("Feature coming soon!")
  start();
}
function view() {
  console.log("================")
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    else {
      for (var i = 0; i < res.length; i++) {
        console.log("ID:"+ res[i].item_id +" || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Number in stock: " + res[i].stock_quantity);     
      }
console.log("================")
start();


    }
  }
  )
}


