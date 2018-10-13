import React, { Component } from "react";
import axios from "axios";

import Template from "./components/Template";
import DateInfo from "./components/DateInfo";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

class App extends Component {
  state = {
    selectedDate: new Date(),
    color: "black",
    items: [],
    sortingState: "asc"
  };

  fetchData = async () => {
    const now = new Date();
    const result = await axios.get("http://localhost:8080/", {
      params: {
        dateString: now.toDateString()
      }
    });
    this.setState({
      items: result.data
    });
  };

  componentDidMount () {
    this.fetchData();
  }

  findIndex = (arr, key, value) => {
    const index = arr.findIndex((item) => item[key] === value);
    return index;
  };

  onClickEnroll = async (title) => {
    // 날짜는 선택된 날짜지만 시간은 지금 현재 시간으로 해야 시간순 정렬됨
    const time = this.state.selectedDate;
    const now = new Date();
    time.setHours(now.getHours());
    time.setMinutes(now.getMinutes());
    time.setSeconds(now.getSeconds());

    console.log(time);
    // console.log(new Date().getHours());
    const newItems = this.state.items;
    const result = await axios({
      method: "post",
      url: "http://localhost:8080/",
      data: {
        title: title,
        check: false,
        date: time.toISOString(),
        deadLine: null
      }
    });
    newItems.push(result.data);
    this.setState({
      items: newItems
    });
  };

  onDelete = async (_id) => {
    console.log(_id);
    try {
      await axios({
        method: "delete",
        url: "http://localhost:8080/",
        data: {
          _id
        }
      });
      const index = this.findIndex(this.state.items, "_id", _id);
      console.log("index : ", index);
      const newItems = this.state.items;
      newItems.splice(index, 1);
      console.log(newItems);
      this.setState({
        items: newItems
      });
    } catch (error) {
      alert(error);
    }
  };

  onChangeCurrentDate = async (difference) => {
    const date = this.state.selectedDate.getDate();
    const newDate = new Date(this.state.selectedDate.setDate(date + difference));
    const result = await axios("http://localhost:8080/", {
      params: {
        dateString: newDate.toDateString()
      }
    });
    this.setState({
      selectedDate: newDate,
      items: result.data
    });
  };

  onClickDoneButton = async (_id, check) => {
    await axios({
      method: "put",
      url: "http://localhost:8080/check",
      data: {
        _id,
        check: !check
      }
    });
    const index = this.findIndex(this.state.items, _id);
    const newItems = this.state.items;
    newItems[index].check = !newItems[index].check;
    this.setState({
      items: newItems
    });
  };

  onChangeDeadLineDate = async (_id, deadLine) => {
    await axios({
      method: "put",
      url: "http://localhost:8080/deadLine",
      data: {
        _id,
        deadLine: deadLine
      }
    });
    const index = this.findIndex(this.state.items, _id);
    const newItems = this.state.items;
    newItems[index].deadLine = deadLine;
    this.setState({
      items: newItems
    });
  };

  onClickSorting = () => {
    let newArr = this.state.items;
    newArr.sort((a, b) => {
      if (a.deadLine > b.deadLine) {
        return this.state.sortingState === "asc" ? -1 : 1;
      } else {
        return this.state.sortingState === "asc" ? 1 : -1;
      }
    });
    this.setState({
      items: newArr,
      sortingState: this.state.sortingState === "asc" ? "desc" : "asc"
    });
  };

  render () {
    console.log(this.state.items);
    return (
      <Template
        dateInfo={<DateInfo date={this.state.selectedDate} onChangeDate={this.onChangeCurrentDate} />}
        form={<Form enroll={this.onClickEnroll} />}
        onClickSorting={this.onClickSorting}
      >
        <TodoList
          items={this.state.items}
          onDelete={this.onDelete}
          onClickDone={this.onClickDoneButton}
          onChangeDeadeLine={this.onChangeDeadLineDate}
        />
      </Template>
    );
  }
}

export default App;
