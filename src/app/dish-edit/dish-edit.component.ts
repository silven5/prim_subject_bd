import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../Model/dish';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.scss'],
})
export class DishEditComponent implements OnInit {
  @Input() id!: string;
  @Input() id_type!: string;
  @Output() dishChange: EventEmitter<Dish> = new EventEmitter<Dish>();
  // Input для страв
  myFormDish!: FormGroup;
  constructor(fb: FormBuilder) {
    this.myFormDish = fb.group({
      dishName: [''],
      dishPrice: [''],
    });
  }
  addDish() {
    let dish = new Dish();
    let l: number = parseInt(this.id) + 1;
    dish.id = l.toFixed();
    dish.name = this.myFormDish.value.dishName;
    dish.price = this.myFormDish.value.dishPrice;
    dish.type = this.id_type;
    this.dishChange.emit(dish);
  }
  ngOnInit() {}
}
