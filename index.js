const store = {deliveries: [], meals: [], employers: [], customers: [] }

class Customer{

  constructor(name, employer) {
    this.id = store.customers.length+1
    this.name = name
    if(employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
    var total = 0
    this.meals().map(i => total += i.price)
    return total
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = store.meals.length+1
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function(x,y){return   y.price - x.price});
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

}

class Delivery {
  constructor(meal, customer) {
    if(meal) {
      this.mealId = meal.id
    }
    if(customer) {
      this.customerId = customer.id
    }
    this.id = store.deliveries.length+1
    store.deliveries.push(this)

  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = store.employers.length+1
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    var arr = []
    var employees = this.employees()
    for(let i in employees) {
      var deliveries = employees[i].deliveries()
      for(let j in deliveries) {
        arr.push(deliveries[j])
      }
    }
    return arr
  }

  meals() {
    var arr = []
    var deliveries = this.deliveries()
    for(var e in deliveries){
      if(!arr.includes(deliveries[e].meal())){
        arr.push(deliveries[e].meal())
      }
    }
    return arr
  }

  mealTotals() {
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let summaryObject = {};
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
  }
}
