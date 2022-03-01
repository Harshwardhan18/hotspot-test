import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as hotspots from 'hotspot-js'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  constructor() { }
  ngOnInit() {
    const hotspotsArray = JSON.parse(localStorage.getItem('hotspots')) || [];
    hotspotsArray.forEach(element => {
      element.path = new Path2D();
      element.isActive = false;
    });
    const settings = {
      type: 'img',
      sourceUrl: 'assets/lobby.jpg',
      hotspots: hotspotsArray || [],
      mode: 'single'
    };
    hotspots.default.setupHotspot(settings);

  }

  ngAfterViewInit(): void {
      this.canvas.nativeElement.addEventListener('hotspot-added', (e) => {
        const arr = JSON.parse(localStorage.getItem('hotspots')) || [];
        arr.push(e.detail);
        localStorage.setItem('hotspots', JSON.stringify(arr));
      });
  }
}
