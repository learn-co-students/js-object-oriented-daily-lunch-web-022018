store = {customers:[], meals:[], deliveries:[], employers:[]}


let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
class Customer{
	constructor(name, employer = {}){
		this.name = name
		this.employerId = employer.id
		this.id = ++customerId

		store.customers.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id

		})
	}

	meals(){
		return this.deliveries().map(delivery => {
			return store.meals.find(meal => {
				return meal.id === delivery.mealId
			})
		})
	}

	totalSpent(){
		return this.meals().reduce(function(total, meal) {return total + meal.price}, 0)
	}


}

class Meal{
	constructor(title, price){
		this.title = title
		this.price = price
		this.id = ++mealId

		store.meals.push(this)

	}


	
	deliveries(){
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id

		})
	}

	customers(){
		return this.deliveries().map(delivery => {
			return store.customers.find(customer => {
				return customer.id === delivery.customerId
			})
		})
	}

	static byPrice(){
		return store.meals.sort(function(meal1, meal2){return meal2.price - meal1.price})
	}

	
}

class Delivery{
	constructor(meal = {}, customer = {}){
		this.mealId = meal.id
		this.customerId = customer.id
		this.id = ++deliveryId

		store.deliveries.push(this)
	}

	meal(){
		return store.meals.find(meal => meal.id == this.mealId)
	}

	customer(){
		return store.customers.find(customer => customer.id == this.customerId)
	}

	
}

class Employer{
	constructor(name){
		this.name = name
		this.id = ++employerId

		store.employers.push(this)
	}

	employees(){
		return store.customers.filter(customer => {
			return customer.employerId === this.id

		})
	}

	deliveries(){
		let allDeliveries = this.employees().map(employee => {
	      return employee.deliveries();
	    });
	    let merged = [].concat.apply([], allDeliveries);
	    return merged;
	}

	meals(){

	    let uniqueMeals = [...new Set(this.allMeals())];
	    return uniqueMeals;
	}

	allMeals(){
		return this.deliveries().map(delivery => {
	      return delivery.meal();
	    });
	}

	mealTotals(){
		let counts = {}

		for (let meal of this.allMeals()){
			if (!(meal.id in counts)){
				counts[meal.id] = 0
			}
			counts[meal.id]++

		}
		console.log(counts)
		return counts
	}




}