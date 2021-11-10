const deselectAndHideOption = (option) => {
  option.classList.add('hidden');
  option.removeAttribute('selected', 'selected');
};

export {deselectAndHideOption};
