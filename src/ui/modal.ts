import { getElementById } from "../utils/dom";

export interface ModalController {
  open: (title: string, content: string) => void;
  close: () => void;
}

export function createModalController(): ModalController {
  const modalScreen = getElementById<HTMLDivElement>("modalScreen");
  const overlay = getElementById<HTMLDivElement>("modalOverlay");
  const closeButton = getElementById<HTMLButtonElement>("modal-close");
  const titleElement = getElementById<HTMLHeadingElement>("modalTitle");
  const contentElement = getElementById<HTMLDivElement>("modalContent");

  const close = () => {
    modalScreen.style.display = "none";
  };

  const open = (title: string, content: string) => {
    titleElement.innerText = title;
    contentElement.innerHTML = content;
    modalScreen.style.display = "block";
  };

  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", close);

  return { open, close };
}
