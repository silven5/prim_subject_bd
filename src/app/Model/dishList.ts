import { ConfigBdService } from '../service/config-bd.service';
import { Dish } from './dish';

export class DishList {
  //Масив зі списком страв
  dishes = new Array();
  //масив з результатами пошуку
  searchDish = new Array();
  //сервіс для спостереження за змінами типу
  typeSub = this.configService.dType$
    //підписуємося на зміни
    .subscribe(() => {
      //отримуємо нове значення страви
      let type = this.configService.dType$.value;
      //якщо зміни відбулися шукаємо усі страв з даного типу
      if (type != undefined) this.search(type.id);
    });
  //ініціалізація початкових значень
  constructor(private configService: ConfigBdService) {}
  //додавання страви
  add(dish: Dish) {
    this.dishes.push(dish);
    this.search(dish.type);
  }
  //пошук страви
  search(id_type: string) {
    //фільтруємо страви за типом
    if (id_type != undefined)
      this.searchDish = this.dishes.filter((dish) => {
        return dish.type == id_type;
      });
  }
}
