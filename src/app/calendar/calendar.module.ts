import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarComponentModule {}
