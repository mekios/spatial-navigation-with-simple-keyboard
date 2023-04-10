import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardAbleDirective } from './keyboard-able.directive';
import { SpatialNavService } from './spatial-nav.service';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyboardAbleDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SpatialNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
