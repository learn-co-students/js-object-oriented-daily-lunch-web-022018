const store = { customers: [], meals: [], employers: [], deliveries: []}
let customerId = 0;
let mealId = 0;
let employerId = 0;
let deliveryId = 0;
function unique() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

class Delivery{
  constructor(meal={}, customer={}){
    this.mealId = meal.id;
    this.customerId = customer.id;
    store.deliveries.push(this)
    this.id = ++deliveryId
  }
  customer() {
    return store.customers.find(customer=>customer.id===this.customerId)
  }
  meal() {
    return store.meals.find(meal=>meal.id===this.mealId)
  }

}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery=>delivery.mealId===this.id)
  }

  customers() {
    return this.deliveries().map(delivery=>delivery.customer())
  }

  static byPrice() {
    return store.meals.sort((a,b)=>b.price-a.price)
  };

}

class Customer{
  constructor(name, employer){
    this.employerId = employer
    this.name = name
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery=>delivery.customerId===this.id)
  }
  meals() {
    return this.deliveries().map(delivery=>delivery.meal())
  }
  totalSpent() {
    let total = 0;
    let prices = []
    this.meals().forEach(meal=>prices.push(meal.price))
    for(const i in prices){
      total+=prices[i]
    }
    return total
  }
}


class Employer{
  constructor(name){
    this.name = name
    store.employers.push(this)
    this.id = ++employerId
  }

  employees() {
    return store.customers.filter(customer=>customer.employerId===this)
  }
  deliveries() {

    return [].concat.apply([], this.employees().map(employee=>employee.deliveries()))
  }
  meals() {
    let totalMeals =  this.deliveries().map(delivery=>delivery.meal())
    return [...new Set(totalMeals)];
  }

  employerStats() {
    let totalMeals = this.deliveries().map(delivery=>delivery.meal())
    let stats = {}
    for(const meal of totalMeals) {
      stats[meal.title] = 0
    }
    for(const meal of totalMeals) {
      stats[meal.title] += 1
    }
    return stats
  }

  mealTotals() {
    let total = 0
  }
}
