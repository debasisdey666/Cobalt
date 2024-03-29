import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy'; // Adjust the path accordingly
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import{ JwPaginationModule } from 'jw-angular-pagination';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './candidate/profile/profile.component';
import { TimeTableComponent } from './candidate/time-table/time-table.component';
import { AttendanceComponent } from './candidate/attendance/attendance.component';
import { DoubtsComponent } from './admin/doubts/doubts.component';
import { AssignmentsComponent } from './admin/assignments/assignments.component';
import { ExamRegistrationComponent } from './candidate/exam-registration/exam-registration.component';
import { AdmitCardComponent } from './candidate/admit-card/admit-card.component';
import { MarkSheetComponent } from './candidate/mark-sheet/mark-sheet.component';
import { ScrutinyComponent } from './candidate/scrutiny/scrutiny.component';
import { FeesComponent } from './candidate/fees/fees.component';
import { CourseContentComponent } from './candidate/course-content/course-content.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { UniversityComponent } from './admin/university/university.component';
import { CollegeComponent } from './admin/college/college.component';
import { AcademicYearComponent } from './admin/academic-year/academic-year.component';
import { SemesterComponent } from './admin/semester/semester.component';
import { PaperTypeComponent } from './admin/paper-type/paper-type.component';
import { CourseTypeComponent } from './admin/course-type/course-type.component';
import { ProgrammeComponent } from './admin/programme/programme.component';
import { BranchComponent } from './admin/branch/branch.component';
import { PaperComponent } from './admin/paper/paper.component';
import { ChapterComponent } from './admin/chapter/chapter.component';
import { TopicComponent } from './admin/topic/topic.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { CollegePgoramMappingComponent } from './admin/college-pgoram-mapping/college-pgoram-mapping.component';
import { StudetPaperMappingComponent } from './studet-paper-mapping/studet-paper-mapping.component';
import { InstructorComponent } from './instructor/instructor.component';
import { PaymentTypeComponent } from './admin/payment-type/payment-type.component';
import { LedgerComponent } from './admin/ledger/ledger.component';
import { AssignmentUploadComponent } from './candidate/assignment-upload/assignment-upload.component';
import { ClassTimeTableComponent } from './admin/class-time-table/class-time-table.component';
import { FeesStructureComponent } from './admin/fees-structure/fees-structure.component';
import { MarksInputComponent } from './admin/marks-input/marks-input.component';
import { AttendenceEntryComponent } from './admin/attendence-entry/attendence-entry.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LibraryComponent } from './library/library.component';
import { ResultComponent } from './result/result.component';
import { StudentHistoryComponent } from './student-history/student-history.component';




// import { PieChartComponent } from './pie-chart/pie-chart.component';

import { Chart } from 'chart.js';
import { NoticeEventComponent } from './notice-event/notice-event.component';
import { MisComponent } from './admin/mis/mis.component';
import { InternshipComponent } from './candidate/internship/internship.component';
import { MentorshipComponent } from './candidate/mentorship/mentorship.component';
import { BookIssueComponent } from './admin/book-issue/book-issue.component';
import { BookmasterComponent } from './bookmaster/bookmaster.component';
import { DownloadToExcelComponent } from './download-to-excel/download-to-excel.component'
import { LibraryClearanceComponent } from './admin/library-clearance/library-clearance.component';
import { ResultInputComponent } from './candidate/result-input/result-input.component';
import { StudentClearenceComponent } from './admin/student-clearence/student-clearence.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TableModule } from 'ngx-easy-table';
import { NoRouteReuseStrategy } from './RouterReuseStrategy/custom-reload-RouterReuseStrategy';
import { UserComponent } from './admin/user/user.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuPermissionComponent } from './admin/role-menu-permission/role-menu-permission.component';
import { TreeviewModule } from 'ngx-treeview';
import { RoletreeComponent } from './admin/roletree/roletree.component';
import { TimetableSchedularComponent } from './admin/timetable-schedular/timetable-schedular.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    TimeTableComponent,
    AttendanceComponent,
    DoubtsComponent,
    AssignmentsComponent,
    ExamRegistrationComponent,
    AdmitCardComponent,
    MarkSheetComponent,
    ScrutinyComponent,
    FeesComponent,
    CourseContentComponent,
    UniversityComponent,
    CollegeComponent,
    AcademicYearComponent,
    SemesterComponent,
    PaperTypeComponent,
    CourseTypeComponent,
    ProgrammeComponent,
    BranchComponent,
    PaperComponent,
    ChapterComponent,
    TopicComponent,
    StudentListComponent,
    CollegePgoramMappingComponent,
    StudetPaperMappingComponent,
    InstructorComponent,
    PaymentTypeComponent,
    LedgerComponent,
    AssignmentUploadComponent,
    ClassTimeTableComponent,
    FeesStructureComponent,
    MarksInputComponent,
    AttendenceEntryComponent,
    LibraryComponent,
    ResultComponent,
    StudentHistoryComponent,
    NoticeEventComponent,
    MisComponent,
    InternshipComponent,
    MentorshipComponent,
    BookIssueComponent,
    BookmasterComponent,
    DownloadToExcelComponent,
    LibraryClearanceComponent,
    ResultInputComponent,
    StudentClearenceComponent,
    SearchFilterPipe,
    UserComponent,
    RoleComponent,
    RoleMenuPermissionComponent,
    RoletreeComponent,
    TimetableSchedularComponent,
    ChangePasswordComponent,
    // PieChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwPaginationModule,
    NgxPaginationModule,
    FullCalendarModule, // register FullCalendar with your app
    RouterModule.forRoot([]),
    TableModule,
    TreeviewModule.forRoot()
    
  ],
  providers: [
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy,
      
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { 
      provide: RouteReuseStrategy, 
      useClass: NoRouteReuseStrategy 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
