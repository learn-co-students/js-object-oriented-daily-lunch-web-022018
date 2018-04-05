
// Meal class:
//
// new Meal() — initialized with title and price;
  // returns an object that has attributes oftitle, price, and id
// deliveries() - returns all of the deliveries that delivered the particular meal.
// customers() - returns all of the customers who have had the meal delivered.
// byPrice() - A class method that orders the meals by their price. Use the static keyword to write a class method.
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
  byPrice(){
    return store.meals.
  }
}//end class
