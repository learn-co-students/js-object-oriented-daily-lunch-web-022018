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
