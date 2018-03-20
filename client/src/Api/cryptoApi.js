export async function getPrice(from, to) {
  const response = await fetch(`http://localhost:8080/p?from=${from}&to=${to}`);
  const responseData = response.json();
  
  return responseData;
 
}

export async function ifExist(value) {
  const response = await fetch(`http://localhost:8080/if/${value}`);
  const responseData = response.json();
  return responseData;
}

export async function Indicators(type, options, pair, timeframe) {
  const response = await fetch(`http://localhost:8080/ind?type=${type}&options=${options}&pair=${pair[0]},${pair[1]}&timeframe=${timeframe}`)
  const responseData = response.json();
  return responseData;
}
