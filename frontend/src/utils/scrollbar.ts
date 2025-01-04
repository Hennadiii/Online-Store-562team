export const disableScroll = () => {
  window.document.body.style.marginRight = `${
    window.innerWidth - document.documentElement.clientWidth
  }px`;
  window.document.body.style.overflowY = "hidden";
};

export const enableScroll = () => {
  const timer = setTimeout(() => {
    window.document.body.style.overflowY = "auto";
    window.document.body.style.marginRight = "0px";
  }, 100);

  return () => clearTimeout(timer);
};
