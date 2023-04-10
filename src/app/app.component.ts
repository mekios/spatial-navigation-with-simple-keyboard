import { Component } from '@angular/core';
import Keyboard from "simple-keyboard";
import { SpatialNavService } from './spatial-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spatial-keyboard-test';
  constructor(private spatial:SpatialNavService){
    this.spatial.SN.add('parentInputs',{selector:
      'input'});
  }
}
