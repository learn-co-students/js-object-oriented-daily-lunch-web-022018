let store = {
  customers: [],
  meals: [],
  deliveries: [],
  employers: []
}

let customerId = 0

class Customer {
  constructor(name, employer = {}) {
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this);
  }

  totalSpent() {
      return this.meals().reduce(function(sum, meal) {
        return sum + meal.price;
      }, 0);
    }

  deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.customerId == this.id;
      });
    }

  meals() {
      return this.deliveries().map(delivery => {
        return delivery.meal();
      });
    }

}

let mealId = 0

class Meal {
    constructor(title, price) {
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
  }

    deliveries() {
      return store.deliveries.filter(delivery => {
        return delivery.mealId == this.id;
      });
    }

    customers() {
      return this.deliveries().map(delivery => {
        return delivery.customer();
      });
    }

    static byPrice() {
      return store.meals.sort((meal1, meal2) => {
        return meal1.price < meal2.price;
      });
    }
}
//
  let deliveryId = 0

class Delivery {
    constructor(meal = {}, customer = {}) {
      this.mealId = meal.id;
      this.customerId = customer.id;
      this.id = ++deliveryId;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(meal => {
        return meal.id === this.mealId;
      });
    }

    customer() {
      return store.customers.find(customer => {
        return customer.id === this.customerId;
      });
    }

  }
  //
let employerId = 0

class Employer {
    constructor(name) {
      this.name = name;
      this.id = ++employerId;
      store.employers.push(this);
    }

    employees() {
      return store.customers.filter(customer => {
        return customer.employerId === this.id


      });
  }

  deliveries() {
      let customer = this.employees().map(customer => {
        return customer.deliveries()
      })
      let merge = [].concat.apply([], customer);
      return merge;
  }

  meals() {
    let stuff = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    let merge = [].concat.apply([], stuff);
    return [...new Set(merge)];
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
