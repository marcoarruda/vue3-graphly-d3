export const getNodeIdFromNodeClickEvent = (
  event: PointerEvent
): string | null => {
  if (!event.target) return null;

  let el = event.target as unknown as HTMLElement;
  const max_jumps = 10;
  let counter = 0;
  while (counter < max_jumps) {
    counter++;
    if (el && el.parentElement) {
      el = el.parentElement as unknown as HTMLElement;
      if (el.classList.contains("gly-node")) return el.getAttribute("data-id");
    }
  }

  return null;
};
