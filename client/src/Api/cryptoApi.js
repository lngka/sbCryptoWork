export async function getPrice(from, to) {
  const response = await fetch(`/p?from=${from}&to=${to}`);
  const responseData = response.json();
  
  return responseData;
 
}

export async function ifExist(value) {
  const response = await fetch(`/if/${value}`);
  const responseData = response.json();
  return responseData;
}

export async function Indicators(type, params, pair, timeframe) {
  const response = await fetch(`/ind?type=${type}&params=${params}&pair=${pair[0]},${pair[1]}&timeframe=${timeframe}`)
  const responseData = response.json();
  return responseData;
}
