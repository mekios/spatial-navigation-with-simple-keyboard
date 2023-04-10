import { Injectable } from '@angular/core';

declare const SpatialNavigation: any;

@Injectable({
  providedIn: 'root'
})
export class SpatialNavService {
  public SN = SpatialNavigation;
  constructor() { 
    this.SN.init();
  }
}
