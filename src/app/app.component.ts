import { LinearLoaderService } from './shared/components/linear-loader/linear-loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Starter';
  showLoader = false;

  constructor(
    private progressBar: LinearLoaderService,
  ) {}

  ngOnInit(): void {
    this.progressBar.toggle$.subscribe(data => {
      this.showLoader = data;
    });
  }


}
