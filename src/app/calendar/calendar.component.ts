import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 캘린더 객체
  calendar = []; // 캘린더 객체
  baseDate; // 오늘 날짜

  // Controller Functions
  onPress($event) {
    console.log("onPress", $event);
  }

  onPressUp($event) {
    console.log("onPressUp", $event);
  }

  setClaendarData = (year, month) => {
    let currentCalendar = []

    const firstDayName = new Date(year, month, 1).getDay(); // 이번달의 첫 날짜의 요일
    const lastDay = new Date(year, month + 1, 0).getDate(); // 이번달의 마지막 날짜
    const prevLastDay = new Date(year, month, 0).getDate(); // 지난달의 마지막 날짜

    let startDayCount = 1;
    let lastDayCount = 1;

    // 1 ~ 5 주차 반복문
    for (let i = 0; i < 5; i++) {
      let temp = []
      // 1 ~ 7 요일 반복문
      for (let j = 0; j < 7; j++) {
        // i == 0: 1주차일 때
        // j < firstDayName: 이번 달 시작이 일요일이 아닐 때
        if (i == 0 && j < firstDayName) {
          temp.push([prevLastDay - (firstDayName - 1) + j, -1]);
        }
        // i == 0: 1주차일 때
        // j == firstDayName: 이번 달 시작 요일일 때
        else if (i == 0 && j == firstDayName) {
          temp.push([startDayCount++, 0]);
        }
        // i == 0: 1주차일 때
        // j > firstDayName: 이번 달 시작 요일 이후 일 때
        else if (i == 0 && j > firstDayName) {
          temp.push([startDayCount++, 0]);
        }
        // startDayCount <= lastDay: 이번 달의 마지막 날이거나 이전일 때
        else if (i > 0 && startDayCount <= lastDay) {
          temp.push([startDayCount++, 0]);
        }
        // startDayCount > lastDay: 이번 달의 마지막 날 이후일 때
        else if (startDayCount > lastDay) {
          temp.push([lastDayCount++, 1]);
        }
      }
      currentCalendar.push(temp);
    }

    return currentCalendar;
  }

  constructor() {
    this.baseDate = new Date();
    this.calendar = this.setClaendarData(this.baseDate.getFullYear(), this.baseDate.getMonth());
  }

  ngOnInit() { }

}
