import { IFighters } from './IFighters';

export interface IAttributes {
  [key: string]: string
}

export interface IElement {
  tagName: string
  className?: string
  attributes?: IAttributes
  title?: string
  alt?: string
}

export interface IModalElement {
  title: string,
  bodyElement: IFighters,
  onClose: () => void
}