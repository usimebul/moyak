import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  // Calendar 변수
  dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"]; // 캘린더 객체
  calendar = []; // 캘린더 객체
  baseDate; // 오늘 날짜

  // Calendar 선택 변수
  drag = false;
  touch = false;
  element; // Touch Move 시, Element Enter 및 Leave 확인 용  

  // Controller Functions
  dragStart($event) {
    this.drag = true;
    var element = $($event.target);
    this.toggleSelection(element);
  }

  dragEnd($event) {
    this.drag = false;
  }

  dragOver($event) {
    if (this.drag) {
      var element = $($event.target);
      this.toggleSelection(element);
    }
  }

  touchStart($event) {
    this.touch = true;
    var element = $($event.target);
    this.toggleSelection(element);
  }

  touchMove($event) {
    var element = $(document.elementFromPoint($event.touches[0].clientX, $event.touches[0].clientY));
    // 이미 진입한 것
    if (this.element !== undefined && this.element[0] === element[0]) {     
      return;
    }
    this.element = this.toggleSelection(element);    
  }

  touchEnd($event) {
    this.touch = false;
  }

  toggleSelection(element) {
    // Calendar 
    if(!element.hasClass("calendar-table-body__col"))
      return;


    if (element.hasClass("selected"))
      element.removeClass("selected")
    else
      element.addClass("selected")

    return element;
  }


  setClaendarData = (year, month) => {
    let currentCalendar = []

    const firstDayName = new Date(year, month, 1).getDay(); // 이번달의 첫 날짜의 요일
    const lastDay = new Date(year, month + 1, 0).getDate(); // 이번달의 마지막 날짜
    const prevLastDay = new Date(year, month, 0).getDate(); // 지난달의 마지막 날짜

    let startDayCount = 1;
    let lastDayCount = 1;

    // [날짜, [-1 | 0 | 1]] -1: 지난 달, 0: 현재, 1: 다음 달
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
