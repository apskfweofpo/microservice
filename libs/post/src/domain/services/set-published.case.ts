import { IPost } from "@lib/post";

export interface ISetPublished {
  setPublished(): void;
}

export const SET_PUBLISHED  = async function (this: IPost) {
  this.published = true
}