import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
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
import { LoginComponent } from './login/login.component';
import { CourseContentComponent } from './candidate/course-content/course-content.component';
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

import { AuthGuard } from './auth.guard';
import { MarksInputComponent } from './admin/marks-input/marks-input.component';
import { AttendenceEntryComponent } from './admin/attendence-entry/attendence-entry.component';
import { LibraryComponent } from './library/library.component';
import { ResultComponent } from './result/result.component';
import { StudentHistoryComponent } from './student-history/student-history.component';
import { NoticeEventComponent } from './notice-event/notice-event.component';
import { RefreshResolveService } from './refresh-resolve.service';
import { MisComponent } from './admin/mis/mis.component';
import { InternshipComponent } from './candidate/internship/internship.component';
import { MentorshipComponent } from './candidate/mentorship/mentorship.component';
import { BookIssueComponent } from './admin/book-issue/book-issue.component';
import { BookmasterComponent } from './bookmaster/bookmaster.component';
import { LibraryClearanceComponent } from './admin/library-clearance/library-clearance.component';
import { ResultInputComponent } from './candidate/result-input/result-input.component';
import { StudentClearenceComponent } from './admin/student-clearence/student-clearence.component';
import { UserComponent } from './admin/user/user.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuPermissionComponent } from './admin/role-menu-permission/role-menu-permission.component';
import { TimetableSchedularComponent } from './admin/timetable-schedular/timetable-schedular.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
     resolve: {
     showAyData: RefreshResolveService
  } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'timetable', component: TimeTableComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'course-content', component: CourseContentComponent, canActivate: [AuthGuard] },
  { path: 'doubts', component: DoubtsComponent, canActivate: [AuthGuard] },
  { path: 'assignment', component: AssignmentsComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'admit-card', component: AdmitCardComponent, canActivate: [AuthGuard] },
  { path: 'mark-sheet', component: MarkSheetComponent, canActivate: [AuthGuard] },
  { path: 'scrutiny', component: ScrutinyComponent, canActivate: [AuthGuard] },
  { path: 'fees', component: FeesComponent, canActivate: [AuthGuard] },

  { path: 'university', component: UniversityComponent , canActivate: [AuthGuard], data: { routeReuse: false } },
  { path: 'college', component: CollegeComponent , canActivate: [AuthGuard], data: { routeReuse: false } },
  { path: 'academic-year', component: AcademicYearComponent , canActivate: [AuthGuard] },
  { path: 'semester', component: SemesterComponent , canActivate: [AuthGuard] },
  { path: 'paper-type', component: PaperTypeComponent , canActivate: [AuthGuard] },
  { path: 'course-type', component: CourseTypeComponent , canActivate: [AuthGuard] },
  { path: 'programme', component: ProgrammeComponent , canActivate: [AuthGuard] },
  { path: 'branch', component: BranchComponent , canActivate: [AuthGuard] },
  { path: 'paper', component: PaperComponent , canActivate: [AuthGuard] },
  { path: 'chapter', component: ChapterComponent , canActivate: [AuthGuard] },
  { path: 'topic', component: TopicComponent , canActivate: [AuthGuard] },
  // { path: 'student-list', component: StudentListComponent , canActivate: [AuthGuard] },
  { path: 'student-master', component: StudentListComponent , canActivate: [AuthGuard] },
  { path: 'college-programm', component: CollegePgoramMappingComponent , canActivate: [AuthGuard] },
  // { path: 'student-paper-mapping', component: StudetPaperMappingComponent , canActivate: [AuthGuard] },
  { path: 'enrollment', component: StudetPaperMappingComponent , canActivate: [AuthGuard] },
  // { path: 'instructor', component: InstructorComponent , canActivate: [AuthGuard] },
  { path: 'faculty', component: InstructorComponent , canActivate: [AuthGuard] },
  { path: 'payment-type', component: PaymentTypeComponent , canActivate: [AuthGuard] },
  // { path: 'ledger', component: LedgerComponent , canActivate: [AuthGuard] },
  { path: 'fees-type', component: LedgerComponent , canActivate: [AuthGuard] },
  { path: 'assignment-upload/:ASSIGNMENT_ID', component: AssignmentUploadComponent , canActivate: [AuthGuard] },
  { path: 'class-time-table', component: ClassTimeTableComponent , canActivate: [AuthGuard] },
  { path: 'fees-structure', component: FeesStructureComponent , canActivate: [AuthGuard] },
  { path: 'marks-input', component: MarksInputComponent , canActivate: [AuthGuard] },
  { path: 'attendance-entry/:attendance_ID', component: AttendenceEntryComponent , canActivate: [AuthGuard] }, 

  { path: 'library', component: LibraryComponent , canActivate: [AuthGuard] }, 
  { path: 'result', component: ResultComponent , canActivate: [AuthGuard] }, 
  // { path: 'student-history/:ID', component: StudentHistoryComponent , canActivate: [AuthGuard] }, 
  { path: 'student-history', component: StudentHistoryComponent , canActivate: [AuthGuard] }, 
  { path: 'notice-event', component: NoticeEventComponent , canActivate: [AuthGuard] }, 
  { path: 'mis', component: MisComponent , canActivate: [AuthGuard] }, 
  { path: 'internship', component: InternshipComponent , canActivate: [AuthGuard] }, 
  { path: 'mentorship', component: MentorshipComponent , canActivate: [AuthGuard] }, 

  { path: 'book-issue', component: BookIssueComponent , canActivate: [AuthGuard] }, 
  { path: 'bookmaster', component: BookmasterComponent , canActivate: [AuthGuard] }, 
  { path: 'library-clearance', component: LibraryClearanceComponent , canActivate: [AuthGuard] }, 
  { path: 'result-input', component: ResultInputComponent , canActivate: [AuthGuard] }, 
  { path: 'student-clearence', component: StudentClearenceComponent, canActivate: [AuthGuard]},

  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'role', component: RoleComponent, canActivate: [AuthGuard]},
  { path: 'role-menu-permission', component: RoleMenuPermissionComponent, canActivate: [AuthGuard]},
  { path: 'timetable-schedular', component: TimetableSchedularComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},


  
  // { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
