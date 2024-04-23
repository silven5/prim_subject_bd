import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DishEditComponent } from '../dish-edit/dish-edit.component';
import { HomePageRoutingModule } from './home-routing.module';
import { DishComponent } from '../dish/dish.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, DishEditComponent, DishComponent],
})
export class HomePageModule {}
