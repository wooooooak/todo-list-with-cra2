import React, { Component } from "react";

import Template from "./components/Template";
import DateInfo from "./components/DateInfo";

class App extends Component {
  render () {
    return <Template dateInfo={<DateInfo date={new Date()} />} />;
  }
}

export default App;
