import React from "react";

import moment from "moment";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import Form from "./Form";
import Header from "./Header";
import ParticleComponent from "./ParticleComponent";
import Daily from "./Daily";

const API_KEY = "3b537e8ddf94b94ca59993debddea4a3";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      temp: "",
      city: "",
      country: "",
      error: "",
      time: this.getTime(),
      date: this.getDate(),
      description: "",
      icon: "",
      latitude: null,
      longitude: null,
      daily: [],
      weekly: {},
    };

    setInterval(() => {
      this.setState({
        time: this.getTime(),
        date: this.getDate(),
      });
    }, 1000);
  }

  gettingCurrentWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
      );
      const data = await api_url.json();
      console.log(data);

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        error: "",
      });
    } else {
      this.setState({
        temp: "",
        city: "",
        country: "",
        description: "",
        icon: "",
        error: "Введите название города",
      });
    }
  };

  getTime() {
    return moment().format("h:mm:ss a");
  }

  getDate() {
    return moment().format("LL");
  }

  detectLocation(data) {
    window.navigator.geolocation.getCurrentPosition((data) => {
      this.setState({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      console.log(data);
    });
  }

  _renderWeather() {
    return this.state.city !== "" ? (
      <React.Fragment>
        <div className="weather-container">
          <Header className="Header" title="Weather" />
          <div className="weather-icon">
            <img
              className="icons"
              src={
                "http://openweathermap.org/img/w/" + this.state.icon + ".png"
              }
              alt="..."
            />
          </div>

          <div className="temperature-value">{`${Math.round(
            this.state.temp
          )} °C`}</div>

          <div className="temperature-description">
            {`${this.state.description}`}
          </div>

          <div className="location">
            {`${this.state.city}, ${this.state.country}`}
          </div>
          <div className="timeDate">
            {`${this.state.time}, ${this.state.date}`}
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className="errors">{this.state.error}</div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <ParticleComponent />
        <div className="overlay">
          <div className="container-main">{this._renderWeather()}</div>
          <div className="container-method">
            <Form weatherMethod={this.gettingCurrentWeather.bind(this)} />
          </div>
          <div className="container-method daily"></div>
          <div className="form-group">
            <button
              className="btn btn-outline-success"
              onClick={this.detectLocation.bind(this)}
            >
              автоматически определить местоположение
            </button>
          </div>
          <Daily />
        </div>
      </div>
    );
  }
}

export default App;
