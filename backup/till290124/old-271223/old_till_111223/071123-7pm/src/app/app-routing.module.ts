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



const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'timetable', component: TimeTableComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'course-content', component: CourseContentComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'assignment', component: AssignmentsComponent },
  { path: 'exam-registration', component: ExamRegistrationComponent },
  { path: 'admit-card', component: AdmitCardComponent },
  { path: 'mark-sheet', component: MarkSheetComponent },
  { path: 'scrutiny', component: ScrutinyComponent },
  { path: 'fees', component: FeesComponent },

  { path: 'university', component: UniversityComponent },
  { path: 'college', component: CollegeComponent },
  { path: 'academic-year', component: AcademicYearComponent },
  { path: 'semester', component: SemesterComponent },
  { path: 'paper-type', component: PaperTypeComponent },
  { path: 'course-type', component: CourseTypeComponent },
  { path: 'programme', component: ProgrammeComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'paper', component: PaperComponent },
  { path: 'chapter', component: ChapterComponent },
  { path: 'topic', component: TopicComponent },
  // { path: 'student-list', component: StudentListComponent },
  { path: 'student-master', component: StudentListComponent },
  { path: 'college-programm', component: CollegePgoramMappingComponent },
  // { path: 'student-paper-mapping', component: StudetPaperMappingComponent },
  { path: 'enrollment', component: StudetPaperMappingComponent },
  // { path: 'instructor', component: InstructorComponent },
  { path: 'faculty', component: InstructorComponent },
  { path: 'payment-type', component: PaymentTypeComponent },
  // { path: 'ledger', component: LedgerComponent },
  { path: 'fees-type', component: LedgerComponent },
  { path: 'assignment-upload/:ASSIGNMENT_ID', component: AssignmentUploadComponent },
  { path: 'class-time-table', component: ClassTimeTableComponent },
  { path: 'fees-structure', component: FeesStructureComponent },
  { path: 'marks-input', component: MarksInputComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
