import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  temperature?: number;
  minTemperature: number = 0;
  maxTemperature: number = 0;
  humidity: number = 0;
  wind: number = 0;
  title = 'weather';
  location = 'hanoi';
  searchInput = '';
  form = '';
  backgroundURL: string = '';

  constructor(private http: HttpClient) {
    this.setBackground();
    this.getWeatherInfo(this.location);
  }

  setBackground() {
    if (this.temperature! <= 25) {
      this.backgroundURL = 'url(assets/imgs/cold.jpg)';
    } else {
      this.backgroundURL = 'url(assets/imgs/sunny.jpg)';
    }
  }

  getWeatherInfo(location: string) {
    let dataURL = `https://api.openweathermap.org/data/2.5/weather?appid=e89c7405a5f0c2f6ac5d813233606e24&units=metric&q=${location}`;
    this.http.get<any>(dataURL).subscribe((response) => {
      console.log(response);
      this.location = response.name;
      this.minTemperature = response.main.temp_min;
      this.maxTemperature = response.main.temp_max;
      this.temperature = response.main.temp;
      this.humidity = response.main.humidity;
      this.wind = response.wind.speed;
      this.setBackground();
      this.searchInput ="";
    });
  }

  handSearchSubmit() {
    let inputLocation = this.searchInput;
    this.getWeatherInfo(inputLocation);
    console.log(inputLocation)
  }
}
