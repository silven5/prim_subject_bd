import { Injectable } from '@angular/core';
import { DishType } from '../Model/dishType';
import { DishTypeList } from '../Model/dishTypesList';

import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ConfigBdService {
  //Визначаємо поточний тип
  currentLang = DEFAULT_DISHTYPE;
  //Визначаємо об'єкт спостерігач
  dType$: BehaviorSubject<DishType> = new BehaviorSubject<DishType>(
    DEFAULT_DISHTYPE
  );
  //змінюємо поточний тип на новий
  setLang(dishType: DishType) {
    console.log('Є зміни!!!!');
    //генеруємо наступне значення
    this.dType$.next(dishType);
  }
  constructor() {}
}
//отримуємо початкове значення
var dishTypeList = new DishTypeList();
const DEFAULT_DISHTYPE = dishTypeList.dishtypes[0];
