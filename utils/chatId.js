const getChatId = (id1, id2) => {
  if (id1.localeCompare(id2) < 0) {
    return `${id1}_${id2}`;
  } else {
    return `${id2}_${id1}`;
  }
};

export default getChatId;
