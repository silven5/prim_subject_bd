import { DishType } from '../Model/dishType';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Dish } from '../Model/dish';
@Injectable({
  providedIn: 'root',
})
export class FirebaseDishTypeService {
  DishTypeRef?: AngularFireList<any>;
  DishRef?: AngularFireList<any>;
  bdRef?: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create DishType
  createDishType(type: DishType) {
    return this.DishTypeRef?.push({
      id: type.id,
      name: type.name,
    });
  }
  // Create Dish
  createDish(dish: Dish) {
    return this.DishRef?.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      type: dish.type,
    });
  }
  // Get Single
  getRecord(id: string, bd: string) {
    this.bdRef = this.db.object('/' + bd + id);
    console.log('bdRef=' + this.bdRef.snapshotChanges());
    return this.bdRef;
  }
  // Get List
  //? true - dishType
  //? false - dish
  getRecordList(bd: string, op: boolean) {
    if (op) {
      this.DishTypeRef = this.db.list('/' + bd);
      return this.DishTypeRef;
    } else {
      this.DishRef = this.db.list('/' + bd);
      return this.DishRef;
    }
  }
  // Update DishType
  updateDishType(id: number, type: DishType, bd: string) {
    this.bdRef = this.db.object('/' + bd + '/' + id);
    return this.bdRef.update({
      id: type.id,
      name: type.name,
    });
  }
  // Update Dish
  updateDish(id: number, dish: Dish, bd: string) {
    this.bdRef = this.db.object('/' + bd + '/' + id);
    return this.bdRef.update({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      type: dish.type,
    });
  }
  // Delete
  deleteRecord(id: string, bd: string) {
    this.bdRef = this.db.object('/' + bd + '/' + id);
    this.bdRef.remove();
  }
}
