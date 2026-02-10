const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) return null;

  const result = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }

  return result;
};

const prime = (num) => {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
};

const hcf = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcm = (a, b) => (a * b) / hcf(a, b);

module.exports = { fibonacci, prime, hcf, lcm };
