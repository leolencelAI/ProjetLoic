import { User } from "./Users";
import { Article } from "./articles";
import { Picture } from "./pictures";

export interface Favoris {
  id:number,
  id_article: number,
  titre: string,
  year: number,
  description:string,
  id_category:number,
  id_picture: number,
  picture: Picture,
}
