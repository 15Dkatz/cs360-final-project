/*
Function which outputs the percentage of monthly payment to invest reach 1,000,000
 - constants are the salary of the individual, and principal investment of 0$
 - and the $1m target
 - ask the user to input either percentage of their monthly payment that they want to save
   in order to see how many years it will take
 - or ask the user to input a number of years in order to see how much of their
   monthly payment they will need to save in order to reach 1,000,000 in that time
   frame
 - use to calculate different $1m goals for CS jobs on the market
*/


// function that returns an object containing the relevant data
function createSavingsObject(salary, target, years, monthly_percentage) {
  let savingsData = {};

  // if salary is undefined, then make it 100,000 by default
  // if target is undefined, then make it 1,000,000 by default
  // if years is undefined, then make it 20 by default
  // if monthly_percentage is undefined, then make it .15 by default
  salary = salary === undefined ? 100000 : salary;
  target = target === undefined ? 1000000 : target;

  let find_by_years = false;
  let find_by_monthly = false;

  if (years === undefined) {
    find_by_years = true;
  }

  if (monthly_percentage === undefined) {
    find_by_monthly = true;
  }

  years = years === undefined ? 20 : years;
  monthly_percentage = monthly_percentage === undefined ? .15 : monthly_percentage;

  var p = 0;
  var m = Math.floor((salary / 12) * monthly_percentage);
  var r = 0.075; // optimistic
  var n = 12;
  var t = years;
  var total = 0;
  var spent = 0;

  // console.log("Data - salary:", salary + ", target:", target + ", years:", years + ", monthly_percentage:", monthly_percentage);

  if (find_by_years) {
    // console.log("Find savings by calculating the total number of years required to make a million by default monthly percentage");
    // incrementing years of investment
    t = 1;

    while (total <= target) {
      total = calculateTotal(p, m, r, n, t);
      spent += m*12;
      t++
    }

    console.log("\n**")
    console.log("Dynamically calculated years by inputting monthly payment!");
    console.log("Will reach $" + target + ", with a salary of", salary + ", a monthly payment payment of", m + ", in number of years:", t);
    console.log("Spent", spent);
    console.log("**\n")
  }
  //
  if (find_by_monthly) {
      // console.log("Find savings object by calculating the monthly percentage required to make a million in default years");
      monthly_percentage = 0.01;

      while (total <= target) {
        m = Math.floor((salary / 12) * monthly_percentage);
        total = calculateTotal(p, m, r, n, t);
        monthly_percentage += 0.01;

        spent = years * (salary * monthly_percentage);
      }

      console.log("\n**")
      console.log("Dynamically calculated monthly payment by inputting years!");
      console.log("Will reach $" + target + ", with a salary of", salary + ", a monthly payment payment of", m + ", in number of years:", t);
      console.log("Spent", spent);
      console.log("**\n")
  }

  // TODO create the resulting object
  return savingsData;
}

// var p = input_principal ? input_principal : 10000;
// var m = input_monthly ? input_monthly : 200;
// var r = input_interest ? input_interest : 0.075; // optimistic
// var n = input_compound ? input_compound : 12;
// var t = input_years ? input_years : 30;

// principal_investment: p,
// monthly_payment: mp,
// annual_interest_rate: r,
// times_compounded_in_year: n,
// years_invested: t,
function calculateTotal(p, m, r, n, t) {
  var i = p * Math.pow(1+r/n, n*t); // initial compound interest
  var v = m * (Math.pow(1+r/n, n*t)-1)/(r/n); // future value
  return i + v;
}

// test with different salaries at 20 years to see the savings data
createSavingsObject(100000, 1000000, undefined, .15);

createSavingsObject(100000, 1000000, 20, undefined);
