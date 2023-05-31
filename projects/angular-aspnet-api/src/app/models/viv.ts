import { ITypes } from "src/app/models/itypes";
export class Viv {
  /**
   *
   */
  constructor(
    public id: number,
    public title: string,
    public contents: string,
    public note: string,
    public category: number
  ) {}
}
