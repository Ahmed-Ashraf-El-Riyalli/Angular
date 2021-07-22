import { environment as env } from './../environments/environment';
import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnChanges {
  title = 'app';

  constructor() {}

  ngAfterViewChecked(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {
  }
}
