import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'subject-example',
    //     appId: '1:181208824239:web:fae7cbc2fecc09e19f975a',
    //     databaseURL: 'https://subject-example-default-rtdb.firebaseio.com',
    //     storageBucket: 'subject-example.appspot.com',
    //     apiKey: 'AIzaSyBK4Aq0ZWpbYUlPENHy-JfILJkdysyEwK0',
    //     authDomain: 'subject-example.firebaseapp.com',
    //     messagingSenderId: '181208824239',
    //     measurementId: 'G-YP76D3PCSV',
    //   })
    // ),
    // !Підключення до Firebase
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    ReactiveFormsModule,
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
