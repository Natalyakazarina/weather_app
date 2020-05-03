import React from "react";

const API_KEY = "3b537e8ddf94b94ca59993debddea4a3";

class Daily extends React.Component {
  constructor() {
    super();

    this.state = {
      
      days: [],
    };
  }

  gettingDailyWeather = async (e) => {
    e.preventDefault();
    if (this.props.city) {
      const daily_url = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&appid=3b537e8ddf94b94ca59993debddea4a3&units=metric`
      );
      const information = await daily_url.json();
      console.log(information);
    }
  };

  render() {
    return (
      <div className="wrappers">
        {this.state.days.map((day) => (
          <div key={day.dt} className="card shadow p-3 mb-2">
            <h6>{new Date(day.dt * 1000).toDateString("yyyy-MM-dd")}</h6>
          </div>
        ))}
      </div>
    );
  }
}

export default Daily;
