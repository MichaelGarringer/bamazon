//start connection
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
  
});

start();
function start() {
  inquirer
    .prompt({
      name: "prompt",
      type: "list",
      message: "Would you like to [BUY] or [VIEW]?",
      choices: ["BUY", "VIEW", "EXIT"]
    })
    .then(function (answer) {

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
function view() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    else {
      //Alternate means of writing the table, console.table just looks cleaner
      // for (var i = 0; i < res.length; i++) {
      //   console.log(
      //     `
      //   --------------------------------------------  
      //   || ID: ${res[i].item_id} 
      //   || Product Name: ${res[i].product_name} 
      //   || Department:  ${res[i].department_name}  
      //   || Price: ${res[i].price} 
      //   || Number in stock: ${res[i].stock_quantity}
      //   --------------------------------------------
      //   `);
      // }
      console.table(res)
      start();
   }
  });
}
function buy() {
  inquirer
    .prompt([{
      name: "buyWhat",
      type: "input",
      message: "Please insert the item ID of the item you wish to purchase",
      filter: Number
    },
    {
      name: "howMany",
      type: "input",
      message: "And how many do you want?",
      filter: Number
    }
    ]).then(function (answer) {
      if (answer.buyWhat <= 55 && answer.buyWhat >= 45) {
        var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.buyWhat }, function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(`
              `);
          }
          var thingBought = answer.buyWhat
          var howManyBought = answer.howMany
          purchase(thingBought, howManyBought)
        });
      }
      else {
        console.log("-----")
        console.log("Sorry that doesn't match one of the items we have in our database")
        console.log("-----")
        buy();
      }
    });
};
function purchase(product, numberToBuy) {
  connection.query('Select * FROM products WHERE item_id = ' + product, function (err, res) {
    if (err) { console.log(err) };
     var newQuantity = res[0].stock_quantity - numberToBuy
    if (numberToBuy <= res[0].stock_quantity) {
      var totalCost = res[0].price * numberToBuy;

var selectedProductMeta = {
"Item Bought": res[0].product_name,
"Number Bought": numberToBuy,
"Total": totalCost}


console.log("Your item is in stock! Purchase Complete!")
console.table([selectedProductMeta])  
console.log("You will now be returned to the beginning")
console.log("------------")

 connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${product} `);
      start();

    } else {
      console.log(`
---------------------------------------------------------------------------
We don't have enough ${res[0].product_name} in stock to complete your order.
---------------------------------------------------------------------------
---------------------------------------
We will now return you to the beginning 
---------------------------------------`)
    };


  });

};



