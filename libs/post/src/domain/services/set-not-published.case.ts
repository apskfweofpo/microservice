import { IPost } from "@lib/post";

export interface ISetNotPublished {
  setNotPublished(): void;

}

export const SET_NOT_PUBLISHED  = async function (this: IPost) {
  this.published = false
}