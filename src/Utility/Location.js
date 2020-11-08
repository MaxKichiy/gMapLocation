export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API}
  `);
  if (!response.ok) {
    throw new Error('Не смогли отправить ваши координаты, попробуйте еще раз');
  }

  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}
