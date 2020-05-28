let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
let store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer) {
    this.id = customerId++
    this.name = name
    if (employer) {this.employerId = employer.id}
    store.customers.push(this)
  }

  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    return this.meals().reduce((total, meal) => {
      return total + meal.price
    },0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal2.price - meal1.price
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    return this.deliveries().map(delivery => {
      return delivery.customer()
    })
  }
}

class Delivery {
  constructor(meal, customer) {
    this.id = deliveryId++
    if (meal) { this.mealId = meal.id }
    if (customer) { this.customerId = customer.id }
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
  })
}

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }
}

class Employer {
  constructor(name) {
    this.id = employerId++
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customer().employerId === this.id
    })
  }

  meals() {
    return [...new Set(this.allMeals())]
  }

  allMeals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }

  mealTotals() {
    let count = {}
    for (let meal of this.allMeals()){
      if (!(meal.id in count)){
        count[meal.id] = 0
      }
      count[meal.id]++
    }
    return count
  }
}
