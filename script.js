document.addEventListener('DOMContentLoaded', function() {
  const convertBtn = document.getElementById('convertBtn');
  const gaaRateCheckbox = document.getElementById('gaaRateCheckbox');
  const amountInput = document.getElementById('amount');
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');
  const resultP = document.getElementById('result');

  convertBtn.addEventListener('click', convert);

  function convert() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const gaaRateEnabled = gaaRateCheckbox.checked;

    let result;
    
    const rates = {
      dollar: {
        unbound: gaaRateEnabled ? 240 : 60 / 28,
        gold: 333333.33
      },
      unbound: {
        dollar: gaaRateEnabled ? 1/240 : 28 / 6000,
        bound: 1.5
      },
      bound: {
        unbound: 1/1.5
      },
      gold: {
        dollar: 1/333333.33
      }
    };
    
    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
      result = amount * rates[fromCurrency][toCurrency];
    } else {
      result = amount;
    }
    
    if (toCurrency === 'dollar') {
      resultP.textContent = `Result: $${result.toFixed(2)}`;
    } else {
      resultP.textContent = `Result: ${result} ${toCurrency}`;
    }
  }
});
