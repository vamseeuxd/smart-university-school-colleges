import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';

import {MaterialModule} from './material.module';
import {AngularFireModule} from '@angular/fire';

const firebaseConfig = {
  apiKey: 'AIzaSyDwl5J6nVd1vMEeA5twlUXI3eRUYgajzGM',
  authDomain: 'arrow-erp.firebaseapp.com',
  databaseURL: 'https://arrow-erp.firebaseio.com',
  projectId: 'arrow-erp',
  storageBucket: 'arrow-erp.appspot.com',
  messagingSenderId: '294771130503',
  appId: '1:294771130503:web:cca09ce66a7faf7b2af822'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    AngularFireModule,
  ],
})
export class SharedModule {
}
