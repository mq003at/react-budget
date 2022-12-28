function getDate(date?: Date): string {
  
  if (!date) date = new Date();
  return`${date.toString().substring(0, 3).toUpperCase()} ${ date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
}

export default getDate
