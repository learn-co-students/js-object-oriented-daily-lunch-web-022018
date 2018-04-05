let store = {customers: [], deliveries: [], meals: [], employers: []};


deliveryId = 0

class Delivery {
  constructor(meal={}, customer={}) {
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++ deliveryId
    store.deliveries.push(this)

  }

  meal(){
    return store.meals.filter((meal) => meal.deliveries().includes(this))[0]
  }

  customer(){
    return store.customers.filter((customer) => customer.deliveries().includes(this))[0]

  }

}




mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++ mealId
    store.meals.push(this)

  }

  deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id)

    }

  customers() {
      return this.deliveries().map(delivery => delivery.customer())
    }

  static byPrice() {
      return store.meals.sort((meal1, meal2) =>  meal2.price - meal1.price)
    }

   }

 employerId = 0
 class Employer {
   constructor(name) {
     this.name = name
     this.id = ++ employerId
     store.employers.push(this)

   }


 employees(){
   return store.customers.filter(customer => customer.employerId === this.id)

     }

 deliveries(){


   let output = []
   for(let employee of this.employees()){
     output = [...output, ...employee.deliveries()]
   }
   return output

 }

 meals() {
   let output = []
   for(let delivery of this.deliveries()) {
     output = [...output, delivery.meal()]
   }
   return Array.from(new Set(output))
 }


 mealTotals() {
    let employees = this.employees()
    let output = {}
    let meals = this.meals()

    for(let meal of meals) {
      output[meal.id] = 0
    }
    let eMeals = []
    for(let employee of employees) {
      for(let eMeal of employee.meals()) {
        output[eMeal.id]++
      }
    }
    return output
  }
}

customerId = 0

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.employerId = employer.id
    this.id = ++ customerId
    store.customers.push(this)
  }


deliveries(){
  return store.deliveries.filter((delivery) => delivery.customerId == this.id)

}

meals(){
  return this.deliveries().map(delivery => delivery.meal())

}


totalSpent() {
    return this.meals().map(meal => meal.price).reduce((a, b) => {return a + b;}, 0)
}


}
