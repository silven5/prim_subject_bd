import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../Model/dish';
import { FirebaseDishTypeService } from '../service/firebase.service';
import { bdDish } from '../service/config-bd';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {
  //Вхідні дані - страви
  @Input() dish!: Dish;
  @Input() fbService!: FirebaseDishTypeService;
  //Вихідні дані - результати редагування
  @Output() edit = new EventEmitter<Dish>();
  @Output() del = new EventEmitter<boolean>();
  editing: boolean = false;
  constructor() {}
  //Видалення страви
  deleteDish() {
    if (window.confirm('Do you really want to delete?')) {
      let id = parseInt(this.dish.id) - 1;
      this.fbService.deleteRecord(id.toFixed(), bdDish);
      this.del.emit(true);
      // this.nextType();
    }
  }
  editDishShow() {
    this.editing = true;
  }
  saveEdit(name: any, price: any) {
    console.log('Edit');
    //if (price > 0 && typeof name === 'string' && typeof price === 'number') {
    this.dish.name = name;
    this.dish.price = price;
    this.editing = false;
    let l: number = parseInt(this.dish.id) - 1;
    this.fbService.updateDish(l, this.dish, bdDish);
    // } else throw 'Error input Dish';
  }
  ngOnInit() {}
}
