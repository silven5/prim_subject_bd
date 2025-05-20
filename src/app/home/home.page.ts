import { DishList } from './../Model/dishList';
import { Component } from '@angular/core';
import { FirebaseDishTypeService } from '../service/firebase.service';
import { DishType } from '../Model/dishType';
import { ConfigBdService } from '../service/config-bd.service';
import { DishTypeList } from '../Model/dishTypesList';
import { Subscription } from 'rxjs';

import { Dish } from '../Model/dish';
import { LoadingController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { bdDish, bdDishType } from '../service/config-bd';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Input для роботи з типом страви
  typeForm = new FormControl('');

  //Загальна видимість
  show = false;
  // Видимість елементів для додавання
  showNewType = false;
  showNewDish = false;
  // Видимисть для редагування
  showEditType = false;
  showEditDish = false;
  //сервіс для спостерігача
  private configService = new ConfigBdService();
  //масив спостерігачів
  private subscriptions: Subscription[] = [];
  //список страв
  dishes = new DishList(this.configService);
  //поточна категорія
  type: DishType = new DishType();
  //лічильник
  count = 0;
  DishTypes = new DishTypeList();
  //об'єкт для очікування
  loading: any;
  constructor(
    public fbService: FirebaseDishTypeService,
    private loadingController: LoadingController
  ) {}
  async showLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Loading...',
    });
    await this.loading.present();
  }
  ngOnInit() {
    this.showLoading();
    // Present the loading controller

    //! Підключення до БД
    this.fetchTask(bdDish, false);
    //!Отримання списку страв
    let taskRes = this.fbService.getRecordList(bdDish, false);
    taskRes.snapshotChanges().subscribe();
    //!Отримання списку типів
    this.fetchTask(bdDishType, true);
    let taskRes1 = this.fbService.getRecordList(bdDishType, true);
    taskRes1.snapshotChanges().subscribe();
    //оголошуємо спостерігача
    const typeSub = this.configService.dType$
      //підписуємося на зміни та отримуємо поточне значення
      .subscribe(() => {
        this.type = this.configService.dType$.value;
      });
    //додаємо цього спостерігача до нашого масиву
    this.subscriptions.push(typeSub);
  }
  //! Функція для отримання списку з БД
  fetchTask(bd: any, op: any) {
    this.fbService
      .getRecordList(bd, op)
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
        if (!op) this.dishes.dishes = res;
        else {
          this.DishTypes.dishtypes = res;
          this.type = this.DishTypes.dishtypes[this.count];
          this.loading.dismiss();
          this.dishes.search(this.type.id);
          this.show = true;
        }
      });
  }
  //вибір наступного типу
  nextType() {
    //якщо в спискі типів є наступний тип
    if (this.count < this.DishTypes.dishtypes.length - 1) {
      //збільшуємо лічильник
      this.count++;
    }
    //інакше обнуляємо його
    else this.count = 0;
    //змінюємо тип у сервісі
    this.configService.setLang(this.DishTypes.dishtypes[this.count]);
  }
  //редагування страви
  editDishShow() {
    this.showEditDish = true;
  }
  //додавання нової страви
  addDishShow() {
    this.showNewDish = true;
  }
  addDish(event: any) {
    if (event as Dish) {
      this.fbService.updateDish(parseInt(event.id) - 1, event, bdDish);
      this.dishes.search(this.type.id);
      this.dishes.add(event);
      this.showNewDish = false;
    }
  }
  deleteDish(event: any) {
    if (event) this.nextType();
  }
  //редагування типу
  editTypeShow() {
    this.showEditType = true;
    this.typeForm.setValue(this.DishTypes.dishtypes[this.count].name);
  }
  //додавання нового типу
  addTypeShow() {
    this.showNewType = true;
  }

  addType() {
    let id: number = 0;
    let l = new DishType();
    if (this.typeForm.value != null) {
      l.name = this.typeForm.value;
      // ! Створюємо новий тип у таблиці БД
      if (this.showNewType) {
        l.id = (this.DishTypes.dishtypes.length + 1).toFixed();
        this.showNewType = false;
        id = this.DishTypes.dishtypes.length;
      }
      //Редагування типу страви
      else {
        if (this.showEditType) {
          l.id = this.DishTypes.dishtypes[this.count].id;
          id = this.DishTypes.dishtypes[this.count].id - 1;
          this.showEditType = false;
        }
      }
      this.fbService.updateDishType(id, l, bdDishType);
    }
    throw Error('Type Dish not found');
  }
  //Видалення типу
  deleteType() {
    if (window.confirm('Do you really want to delete?')) {
      let id = this.DishTypes.dishtypes[this.count].id - 1;
      let dt = this.DishTypes.dishtypes[this.count].id;
      let ar = this.dishes.dishes.filter((dish) => {
        return dish.type == dt;
      });
      ar.forEach((dish) => {
        let id = parseInt(dish.id) - 1;
        this.fbService.deleteRecord(id.toFixed(), bdDish);
      });
      this.fbService.deleteRecord(id.toFixed(), bdDishType);
      this.nextType();
    }
  }
  //Якщо закінчили працювати до відписуємося від усього
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
