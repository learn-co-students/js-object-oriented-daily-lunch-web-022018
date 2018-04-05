let store = {customers:[], employers:[], meals:[], deliveries:[] }
let deliveryId = 0
let mealId = 0
let customerId = 0
let employerId = 0

class Delivery{
  constructor(meal=0, customer=0){
    this.id = ++deliveryId
    this.mealId = meal.id
    this.customerId = customer.id
    store.deliveries.push(this)
  }

  customer(){
    return store.customers.find((customer)=>{return this.customerId === customer.id})
  }

  meal(){
    return store.meals.find((meal)=>{return this.mealId === meal.id})
  }
}

class Meal{
  constructor(name, price){
    this.title = name
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter((delivery)=>(delivery.mealId === this.id))
  }
  customers() {
    let customDeliveries = this.deliveries()
    let mealCustomers = []
    for(const el of customDeliveries){
      mealCustomers.push(store.customers.find((customer)=>(el.customerId === customer.id)))
    }
    return mealCustomers
  }

  static byPrice(){
    let sortMeals = store.meals.sort((a, b)=> {return a.price - b.price})
    return sortMeals.reverse()
  }
}

class Employer{
  constructor(name) {
    this.id = ++employerId
    this.name= name
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter((employee)=>(employee.employerId === this))
  }

  deliveries() {
    let employ = this.employees()
    let deli = []
    for(const el of employ){
      deli.push(el.deliveries())
    }
    return deli.reduce((acc, val) => acc.concat(val), [])
  }

  meals(){
    let deli = this.deliveries()
    let meals = []
    for (const el of deli){
      !meals.includes(el.meal()) ? meals.push(el.meal()) : meals
    }
    return meals
  }

  mealTotals(){
    let meals = this.meals()
    console.log(meals)
    let mealList = {}
    for (const el of meals){
      console.log(el)
      mealList[el.id] = el.deliveries().length
    }
    console.log(mealList)
    return mealList
  }

}

class Customer{
  constructor(name, employerId) {
    this.id = ++customerId
    this.name = name
    this.employerId = employerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery)=>(delivery.customerId === this.id))
  }

  meals(){
    let customDeliveries = this.deliveries()
    let customMeals = []
    for(const el of customDeliveries){
      customMeals.push(store.meals.find(function(meal){return el.mealId === meal.id}))
    }
    return customMeals
  }

  totalSpent (){
    return this.meals().reduce((total, meal)=>(total + meal.price), 0)
  }

}
