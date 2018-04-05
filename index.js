let customerId = 0

const store = {customers: [], meals: [], deliveries: [], employers: []}

class Customer {
  constructor(name, employer) {
    this.id = customerId++
    this.name = name
    if (arguments.length > 1) {
      this.employerId = employer.id
    }
    store["customers"].push(this);
  }

  deliveries() {
    return store["deliveries"].filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent() {
    let price = this.meals().reduce(function(acc, meal) {
      return acc.price + meal.price
    })
    return price
  }
}

let mealId = 0

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store["meals"].push(this);
  }

  static byPrice() {
    return store["meals"].sort(function(a, b) {return b.price - a.price})
  }

  deliveries() {
    return store["deliveries"].filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, customer) {
    if (arguments.length > 0) {
      this.customerId = customer.id
      this.mealId = meal.id
    }
    this.id = deliveryId++
    store["deliveries"].push(this);
  }

  meal() {
    return store["meals"].find(meal => meal.id === this.mealId)
  }

  customer() {
    return store["customers"].find(customer => customer.id === this.customerId)
  }
}

let employerId = 0

class Employer {
  constructor(name) {
    this.name = name
    this.id = employerId++
    store["employers"].push(this)
  }

  employees() {
    return store["customers"].filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    // let deliveryArr = this.employees().map(employee => employee.deliveries())
    let tempArr = []
    this.employees().forEach(function(employee) {
      tempArr = [...tempArr, ...employee.deliveries()]
    })
    return tempArr
  }

  meals() {
    let meals = new Set(this.deliveries().map(delivery => delivery.meal()))
    return Array.from(meals)
  }

  mealTotals() {
    let output = {}
    let meals = this.deliveries().map(delivery => delivery.meal())
    let temp = [...meals.reduce((mp, meal) => {
      if (!mp.has(meal.id)) mp.set(meal.id, Object.assign({ count: 0}, meal));
      mp.get(meal.id).count++;
      return mp;
    }, new Map).values()];
    temp.forEach(function(meal) {
      console.log(meal)
      let obj = {}
      obj[meal.id] = meal.count
      Object.assign(output, obj)
    })
    return output
  }
}
