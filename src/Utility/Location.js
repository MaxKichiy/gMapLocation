export async function getAddressFromCoords(coords) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.GOOGLE_API}
  `);

  if (!response.ok) {
    throw new Error('Не смогли получить ваши координаты, попробуйте еще раз.');
  }
  console.log('getCoordsFromAddress -> response', response);

  const data = await response.json();

  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const address = data.results.formatted_address;
  return address;
}

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API}
  `);
  if (!response.ok) {
    throw new Error('Не смогли получить ваши координаты, попробуйте еще раз.');
  }

  const data = await response.json();

  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}
