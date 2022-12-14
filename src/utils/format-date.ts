export const formatDate = (formatted: string) => {
  const formattedArray = formatted.split('/');
  if (+formattedArray[0] > 31) {
    formattedArray[0] = '31';
  }
  if (+formattedArray[1] > 12) {
    formattedArray[1] = '12';
  }
  const currentDate = new Date();
  if (+formattedArray[2] > currentDate.getFullYear()) {
    formattedArray[2] = currentDate.getFullYear().toString();
  }
  if (formatted.length === 10) {
    if (currentDate.getFullYear() - +formattedArray[2] > 100) {
      formattedArray[2] = (currentDate.getFullYear() - 100).toString();
    }
  }
  return formattedArray.join('/');
};
