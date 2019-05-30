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
      message: "Would you like to [BUY] or [VIEW]?",
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
  inquirer
    .prompt({
      name: "buyWhat",
      type: "input",
      message: "Please insert the item ID of the item you wish to purchase? (If you don't know, you can always VIEW)"
    }).then(function (answer) {
      var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
      connection.query(query, { item_id: answer.buyWhat }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Product: " + res[i].product_name + " || Price: " + res[i].price + " || Number in Stock: " + res[i].stock_quantity);
          again();
        }
      });
    })
}

function view() {
  console.log("================")
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    else {
      for (var i = 0; i < res.length; i++) {
        console.log(
          `
        --------------------------------------------  
        || ID: ${res[i].item_id} 
        || Product Name: ${res[i].product_name} 
        || Department:  ${res[i].department_name}  
        || Price: ${res[i].price} 
        || Number in stock: ${res[i].stock_quantity}
        --------------------------------------------
        `);
      }

      start();


    }
  }
  )
}

function again() {
  inquirer
    .prompt({
      name: "addToCart",
      type: "list",
      message: "Would you like to add this item to your cart?",
      choices: ["Yes", "No", "View", "Exit"]
    })
    .then(function (answer) {
      switch (answer.addToCart) {
        case "Yes":
         console.log("Function coming soon!")
          break;
        case "No":
          buy();
          break;
        case "View":
          view()
          break;
        case "Exit":
          start();
          break;
      }
    })
}
