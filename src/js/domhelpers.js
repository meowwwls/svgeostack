export const setText = (el, msg, end = '') => {
  el.textContent = msg;

  if (end) {
    setTimeout(() => {
      el.textContent = end;
    }, 1000);
  }
};
