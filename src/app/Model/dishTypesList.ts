import { DishType } from './dishType';
export class DishTypeList {
  dishtypes = new Array();
  constructor() {}
  add(dishType: DishType) {
    this.dishtypes.push(dishType);
  }
}
