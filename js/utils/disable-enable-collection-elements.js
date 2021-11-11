const disableCollectionElements = (collection) => {
  collection.forEach((element) => element.disabled = true);
};

const enableCollectionElements = (collection) => {
  collection.forEach((element) => element.disabled = false);
};

export {disableCollectionElements, enableCollectionElements};
