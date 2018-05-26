import { Response, Http } from '@angular/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private apiUrl = 'http://127.0.0.1:9000/api/authors';
  data: any = {};

  constructor(private http: Http) {
    console.log('Hello fellow user');
    this.getAuthors();
    this.getData();
  }

  getData() {
    return this.http.get(this.apiUrl);
  }

  getAuthors() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

}
