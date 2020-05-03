import React from "react";
import "./App.css";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";

function Form(props) {
  return (
    <div>
      <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder="введите название города" />
        <div>
          <button className="btn btn-outline-primary">
            получить сведения о погоде
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
