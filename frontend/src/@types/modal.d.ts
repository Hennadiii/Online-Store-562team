import { Dispatch, SetStateAction } from 'react';

export interface Imodal {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface IsetSection {
  setSection: Dispatch<SetStateAction<number>>;
}
