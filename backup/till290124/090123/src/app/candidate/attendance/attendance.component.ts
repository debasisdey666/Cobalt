import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  events: any = [
    { title: 'present', subject:'Angular', date: '2023-08-02', color:'#03d103'},
    { title: 'present', subject:'React', date: '2023-08-04', color:'#03d103'},
    { title: 'absent', subject:'Dot net', date: '2023-08-06', color:'#ff0000'},
    { title: 'present', subject:'PHP', date: '2023-09-01', color:'#03d103'},
    { title: 'absent', subject:'SEO', date: '2023-09-02', color:'#ff0000'},
    { title: 'css', subject:'css', date: '2023-08-08', color:'#03d103'},
    { title: 'HTML', subject:'HTML', date: '2023-08-08', color:'#ff0000'},
  ]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.handleDateClick.bind(this)
  };
  title: any;
  date:any;

  constructor() { }

  ngOnInit(): void {
    
  }

  handleDateClick(arg:any){
    console.log(arg);
    // alert(arg.event.date);
     console.log(arg.event._def.title);
    alert( "Arijit"  + " " + arg.event._def.title + " in " + arg.event._def.extendedProps.subject + " class " +  "on " + " " + arg.event._instance.range.start.toDateString());
   

  }

}
