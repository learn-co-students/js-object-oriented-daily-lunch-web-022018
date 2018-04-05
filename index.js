let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0;

class Customer {
  constructor(name){
    this.name = name;
    // this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

  // meals(){
  //   return store.meals.filter(meal => customerId === this.id);
  // }

  totalSpent(){
    return this.meals().map(meal => meal.price);
  }
}

let employerId = 0;

class Employer {
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);
  }
}


// Meal class:
//
// new Meal() — initialized with title and price;
  // returns an object that has attributes oftitle, price, and id
// deliveries() - returns all of the deliveries that delivered the particular meal.
// customers() - returns all of the customers who have had the meal delivered.
// byPrice() - A class method that orders the meals by their price.
  // Use the static keyword to write a class method.
// let store = {customers: [], meals: [], deliveries: [], employers: []}

let mealid = 0;
class Meal {
  constructor(title,price){
    this.title=title;
    this.price=price;
    this.id = ++mealid
    store.meals.push(this)
  }//end constructor
  deliveries(){
  }//deliveries
  static byPrice(){
    return store.meals.sort( function(a,b){
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    })//sort
  }
}//end class

let deliveryId = 0;
class Delivery {
  constructor(){
    // this.mealId = meal.id;
    // this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
}
