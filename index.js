let customerid = 0
let mealid = 0
let deliveryid = 0
let employerid = 0

store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer='defaultValue') {
    this.name = name
    this.employerId = employer.id
    this.id = customerid++

    store.customers.push(this)

  }
  deliveries(){
    return store.deliveries.filter((delivery) => {return delivery.customerId == this.id})
  }
  meals(){
    return this.deliveries().map((delivery) => {return delivery.meal()})
  }
  totalSpent(){
    let priceArray = this.meals().map((meal) => {return meal.price})
    return priceArray.reduce((x, y) => x+y)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealid++

    store.meals.push(this)

  }
  deliveries(){
    return store.deliveries.filter((delivery) => {return delivery.mealId === this.id})
  }
  customers(){
    return this.deliveries().map((delivery) => {return delivery.customer()})
  }
  static byPrice(){
    return store.meals.sort(function(a,b) {return b.price - a.price})
  }
}

class Delivery {
  constructor(meal='defaultValue', customer='defaultValue') {
    this.mealId = meal.id || undefined
    this.customerId = customer.id || undefined
    this.id = deliveryid++

    store.deliveries.push(this)

  }
  meal() {
    return store.meals.find((meal) => {return this.mealId === meal.id})
  }
  customer(){
    return store.customers.find((meal) => {return this.customerId === meal.id})
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = employerid++

    store.employers.push(this)

  }
  employees() {
    return store.customers.filter((customer) => {return customer.employerId === this.id})
  }
  deliveries() {
    let deliveries = this.employees().map((employee) => {return employee.deliveries()})
    return deliveries.reduce(function(a,b){return a.concat(b)})
  }
  meals() {
    let allmeals = this.employees().map((employee) => {return employee.meals()})[0]
    return allmeals.filter(function(v, i, a) {return a.indexOf(v) === i});
  }
  mealTotals() {
    let allmeals = this.employees().map((employee) => {return employee.meals()})
    allmeals = allmeals.reduce(function(a,b){return a.concat(b)})
    let allmealids = allmeals.map((meal) => {return meal.id})
    let results = {}
    for (let i = 0; i < allmealids.length; i ++) {
      if (!results[allmealids[i]]) {
        results[allmealids[i]] = 0
      }
      results[allmealids[i]] += 1
    }
    return results


  }
}
