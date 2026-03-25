export const disableScroll = () => {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // 🔥 БЛОКИРУЕМ scroll на html, а не на body
  document.documentElement.style.overflow = "hidden";

  // чтобы не было сдвига из-за исчезновения скроллбара
  document.body.style.marginRight = `${scrollBarWidth}px`;
};

export const enableScroll = () => {
  document.documentElement.style.overflow = "";
  document.body.style.marginRight = "";
};