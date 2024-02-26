import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { TimeTableService } from '../../services/time-table.service';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  events: any = [
    // { PAPER_NAME:'Control System', CLASS_OF_DATE: '2023-10-05',START_TIME: '20:00:00',END_TIME: '21:00:00', color:'#03d103'},
    // { PAPER_NAME:'DIGITAL ELECTRONICS', CLASS_OF_DATE: '2023-10-06',START_TIME: '20:00:00',END_TIME: '21:00:00', color:'#03d103'},

    // { title: 'present', subject:'Angular', date: '2023-08-02', color:'#03d103'},
    // { title: 'present', subject:'React', date: '2023-08-04', color:'#03d103'},
    // { title: 'absent', subject:'Dot net', date: '2023-08-06', color:'#ff0000'},
    // { title: 'present', subject:'PHP', date: '2023-09-01', color:'#03d103'},
    // { title: 'absent', subject:'SEO', date: '2023-09-02', color:'#ff0000'},
    // { title: 'css', subject:'css', date: '2023-08-08', color:'#03d103'},
    // { title: 'HTML', subject:'HTML', date: '2023-08-08', color:'#ff0000'},
  ]

  PAPER_NAME: any;
  START_TIME:any;
  CLASS_OF_DATE:any;
  END_TIME:any;
  data: any;
  showtimetbl: any;
  showTmtl: any = [];

  constructor(
    private serviceData:TimeTableService,
  ) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.handleDateClick.bind(this)
  };

  transformDataForFullCalendar(apiData: any[]): any[] {
    return apiData.map((item: any) => ({
      title: item.PAPER_NAME,
      start: new Date(item.CLASS_OF_DATE), // Start time
      end: new Date(item.CLASS_OF_DATE),   // End time (initially set to start time)
      extendedProps: {
        START_TIME: item.START_TIME,
        END_TIME: item.END_TIME, // Store END_TIME as an extended property
      },
      color: '#03d103', // Adjust the color as needed
    }));
  }
  
  
  // userId = environment.userId;

  ngOnInit(): void {
    
  const userId = getFromLocalStorage('userId');
    const requestData = {
      id: userId,
      mode: 'V',
    };
  
    this.serviceData.getTimetableData(requestData).subscribe((data: any) => {
      this.showtimetbl = data;
      this.showTmtl = this.showtimetbl['Data'];
      console.log("this.showTmtl");
      console.log(this.showTmtl);
  
      // Update the events array here if needed
      this.events = this.transformDataForFullCalendar(this.showTmtl);
      this.calendarOptions.events = this.events;
    });
  }

  // handleDateClick(arg:any){
  //   console.log(arg);
  //   // alert(arg.event.date);
  //    console.log(arg.event.PAPER_NAME);
  //   // alert( "Arijit"  + " " + arg.event._def.PAPER_NAME + " in " + arg.event._def.extendedProps.subject + " class " +  "on " + " " + arg.event._instance.range.start.toDateString());
   

  // }

  handleDateClick(arg: any) {
    const title = arg.event.title;
    const starttime = arg.event.extendedProps.START_TIME;
    const end = arg.event.extendedProps.END_TIME;
    alert(`${title} class start at - ${starttime} and ends at ${end}`);
  }

}
