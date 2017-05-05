var fs = require('fs');

// example
/* {

  principal_investment: ...,
  monthly_payment: ...,
  annual_interest_rate: ..., (annual interest rate compounded monthly)
  times_compounded_in_year: ..., (the number of times the interest is compounded per year)
  years_invested: ...,
  year_pulled: ..., date to draw the ivestment value
  spent: ..., total money spent
  value: ...
}
*/


function makeData(input_principal, input_monthly, input_interest, input_compound, input_years) {
  var savings_through_years = [];

  var p = input_principal ? input_principal : 10000;
  var m = input_monthly ? input_monthly : 200;
  var r = input_interest ? input_interest : 0.075; // optimistic
  var n = input_compound ? input_compound : 12;
  var t = input_years ? input_years : 30;


  // var total = calculateTotal(p, m, r, n, t);
  // 45 years
  for (var years = t; years <=50; years++) {
    var total_val = calculateTotal(p, m, r, n, years);
    var spent = p + m*n*years;

    var saving = {
      principal_investment: p,
      monthly_payment: m,
      annual_interest_rate: r,
      times_compounded_in_year: n,
      years_invested: years,
      year_pulled: new Date((2017+years)+"-01-01"),
      spent,
      value: +total_val.toFixed(2)
    }

    savings_through_years.push(saving);
  }

  console.log('savings_through_years', savings_through_years);

  fs.writeFile('./savings_through_years.json', JSON.stringify(savings_through_years));


  var savings_by_monthly_payment = [];
  // iterate by 50 up from 100-1000
  for (var mp = 100; mp <= 1000; mp+=50) {
    var total_val = calculateTotal(p, mp, r, n, t);

    var spent = p + mp*n*t;

    var saving = {
      principal_investment: p,
      monthly_payment: mp,
      annual_interest_rate: r,
      times_compounded_in_year: n,
      years_invested: t,
      year_pulled: new Date((2017+t)+"-01-01"),
      spent,
      value: +total_val.toFixed(2)
    }

    savings_by_monthly_payment.push(saving);
  }

  console.log(savings_by_monthly_payment);

  fs.writeFile('./savings_by_monthly_payment.json', JSON.stringify(savings_by_monthly_payment))
}

function calculateTotal(p, m, r, n, t) {
  var i = p * Math.pow(1+r/n, n*t); // initial compound interest
  var v = m * (Math.pow(1+r/n, n*t)-1)/(r/n); // future value
  return i + v;
}

makeData();
