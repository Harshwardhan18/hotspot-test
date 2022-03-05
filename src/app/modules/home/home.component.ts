import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as hotspots from 'hotspot-js'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  mode = false;
  constructor() { }
  ngOnInit() {
    this.setupHotspotConfiguration();

  }

  setupHotspotConfiguration(mode?: string) {
    const hotspotsArray = JSON.parse(localStorage.getItem('hotspots')) || [];
    hotspotsArray.forEach(element => {
      element.path = new Path2D();
      element.isActive = false;
    });
    const settings = {
      type: 'img',
      sourceUrl: 'assets/lobby.jpg',
      hotspots: hotspotsArray || [],
      mode: mode || 'single'
    };
    hotspots.default.setupHotspot(settings);
  }

  changeConfiguration() {
    this.mode = !this.mode;
    this.setupHotspotConfiguration(this.mode ? 'single' : 'multi');
  }

  ngAfterViewInit(): void {
      this.canvas.nativeElement.addEventListener('hotspot-added', (e) => {
        const arr = JSON.parse(localStorage.getItem('hotspots')) || [];
        if(!this.mode) {
          arr.push(e.detail);
        } else {
          this.editHotspot(arr, e);
        }
        localStorage.setItem('hotspots', JSON.stringify(arr));
      });
  }

  editHotspot(arr: any, e: any) {
    let index = null;
  const editableHotspot = arr.find((hotspot, i) => {
    if (hotspot.isActive) {
      index = i;
      return hotspot;
    }
  });
  if(editableHotspot){
    arr[index] = e.detail;
  } else {
    arr.push(e.detail);
  }
  }
}

