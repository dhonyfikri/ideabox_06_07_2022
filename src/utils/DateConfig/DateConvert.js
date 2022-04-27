const dateToText = (date = new Date()) => {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};

const textToDate = dateText => {
  const arrStrDate = dateText.split('/');
  let newDateText = '';
  for (let i = 0; i < arrStrDate.length; i++) {
    const twoDigitStr =
      arrStrDate[i].length > 1 ? arrStrDate[i] : '0' + arrStrDate[i];
    newDateText = twoDigitStr + newDateText;
    if (i + 1 !== arrStrDate.length) {
      newDateText = '-' + newDateText;
    }
  }

  return new Date(newDateText);
};

export {dateToText, textToDate};
