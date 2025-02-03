import { Dispatch, SetStateAction } from "react";

export interface Imodal {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  center?: boolean;
}

export interface Iauthorization {
  setSection?: Dispatch<SetStateAction<number>>;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  isModal?: boolean;
}
