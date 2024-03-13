import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class MisService {

  url=environment.baseUrl+"api/MIS/StudentHistory";
  url2=environment.baseUrl+"api/MIS/feescollectiondetails";
  url3=environment.baseUrl+"api/MIS/studentcount";
  url4=environment.baseUrl+"api/MIS/LibraryDefaulter";
  url5=environment.baseUrl+"api/MIS/instructorcount";
  url6=environment.baseUrl+"api/MIS/feesdefaulter";
  url7=environment.baseUrl+"api/Filter_ClassTimetable";
  url8=environment.baseUrl+"api/StudentAttendanceReport/StudentAttendanceReport";
  url9=environment.baseUrl+"api/LibraryClearance/ViewLibraryClearance";
  url20=environment.baseUrl+"api/student_fail_pass_report/student_fail_pass_report";

  student_id: any;

  //variables for datatables
  branch: any;
  academicYear: any;
  fromDate: any;
  toDate: any;
  ayId: any;
  semId: any;

  constructor(private http: HttpClient) {
    
  }

  // setStudentId(id: any): void {
  //   this.student_id = id;
  // }




  showStudentHistory(formData:any){
    const userId = getFromLocalStorage('userId');

    let StudentHistoryAY: any;
    let StudentHistoryBranch: any;
    let StudentHistorySem: any;

    if(formData.aY_ID == ''){
      StudentHistoryAY = 0;
    }else{
      StudentHistoryAY = formData.aY_ID;
    }

    if(formData.brancH_ID == ''){
      StudentHistoryBranch = 0;
    }else{
      StudentHistoryBranch = formData.brancH_ID;
    }

    if(formData.seM_ID == ''){
      StudentHistorySem = 0;
    }else{
      StudentHistorySem = formData.seM_ID;
    }

    
    var data=
    {
      "studenT_ID":0,
      "reporT_TYPE": 2,
      "aY_ID": StudentHistoryAY,
      "brancH_ID": StudentHistoryBranch,
      "seM_ID": StudentHistorySem
    }
    return this.http.post(this.url,data)
  }

 
 
  showStudDetails(studentID: number) {

    var data = {
      "studenT_ID": studentID,
      "reporT_TYPE": 1,
      "aY_ID": 0,
      "brancH_ID": 0,
      "seM_ID": 0
    };

    return this.http.post(this.url, data);
  }

  showStudentFeesDetails(formData:any){
    const userId = getFromLocalStorage('userId');

    let FeesDetailSem: any;
    let FeesDetailBranch: any;
    let FeesDetailAy: any;

    if(formData.seM_ID == ''){
      FeesDetailSem = 0;
    }else{
      FeesDetailSem = formData.seM_ID;
    }

    if(formData.brancH_ID == ''){
      FeesDetailBranch = 0;
    }else{
      FeesDetailBranch = formData.brancH_ID;
    }

    if(formData.aY_ID == ''){
      FeesDetailAy = 0;
    }else{
      FeesDetailAy = formData.aY_ID;
    }

    
    var data=
    {
      
        "semID": FeesDetailSem,
        "branchID": FeesDetailBranch,
        "ayid": FeesDetailAy,
        "fromDate": formData.fmdate,
        "toDate": formData.todate,
      
    }
    return this.http.post(this.url2,data)
  }


  showStudentCnt(formData:any){
    const userId = getFromLocalStorage('userId');
    let studentBranch: any;
    let studentSem: any;
    let studentAy: any;

    if (formData.brancH_ID == ''){
      studentBranch = 0;
    }else{
      studentBranch = formData.brancH_ID;
    }

    if (formData.seM_ID == ''){
      studentSem = 0;
    }else{
      studentSem = formData.seM_ID;
    }

    if (formData.aY_ID == ''){
      studentAy = 0;
    }else{
      studentAy = formData.aY_ID;
    }
    
    var data=
    {
      "brancH_ID": studentBranch,
      "currenT_SEM": studentSem,
      "currenT_AY": studentAy
    }
    return this.http.post(this.url3,data)
  }


 showFacultyCnt(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.aY_ID);
    console.log(formData.brancH_ID);
    console.log(formData.seM_ID);

    let facultyBranch: any;

    if (formData.brancH_ID == ""){
      facultyBranch = 0
    }
    else{
      facultyBranch = formData.brancH_ID
    }
    
    var data=
    {
      "brancH_ID": facultyBranch,
    }
    return this.http.post(this.url5,data)
  }

  showLibraryDefaulter(formData:any){
    const userId = getFromLocalStorage('userId');

    var data=
    {
      "fromDate": formData.fmdate,
      "toDate": formData.todate,
    }
    return this.http.post(this.url4,data)
  }


  showFeesDefaulter(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.fmdate);
    console.log(formData.todate);
    
    var data=
    {
      // "fromDate": formData.fmdate,
      "toDate": formData.todate,
    }
    return this.http.post(this.url6,data)
  }

   // Student Attendance

   showStudentDefaulter(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.fmdate);
    console.log(formData.todate);
    console.log(formData.reporT_TYPE);
    console.log(formData.INSTRUCTOR_NAME);
    console.log(formData.STUDENT_NAME);
    
    var data=
    // {
    //   "useR_ID": 0,
    //   "reporT_TYPE": formData.reporT_TYPE,
    //   "instructoR_ID": formData.instructoR_ID,
    //   "studenT_ID": formData.STUDENT_NAME,
    //   "clasS_OF_DATE_START": "string",
    //   "clasS_OF_DATE_END": "string",
    //   "clasS_OF_DATE_MONTH": "",
    //   "papeR_ID": formData.PAPER_NAME,
    //   "fromDate": formData.fmdate,
    //   "toDate": formData.todate,
    // }
    {
      "useR_ID": userId,
      "reporT_TYPE": 9,
      "instructoR_ID": formData.INSTRUCTOR_NAME,
      "studenT_ID": formData.STUDENT_NAME,
      "clasS_OF_DATE_START": formData.fmdate,
      "clasS_OF_DATE_END": formData.todate,
      "clasS_OF_DATE_MONTH": "0",
      "papeR_ID": formData.papeR_ID,
    }
    return this.http.post(this.url7,data)
  }


   // Student Attendance new


 showStudentAttnw(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=   
    {
      "useR_ID": userId,
      "reporT_TYPE": 9,
      "branch_id": formData.brancH_ID,
      "aY_ID": formData.aY_ID,
      "seM_ID": formData.seM_ID,
      "clasS_OF_DATE_START": formData.fmdate,
      "clasS_OF_DATE_END": formData.todate,
    }
    return this.http.post(this.url8,data)
  }

// RANK

showRank(formData:any){
  const userId = getFromLocalStorage('userId');
  
  var data=
  {
    "studenT_ID": 0,
    "reporT_TYPE":formData.reporT_TYPE,
    "aY_ID": formData.aY_ID,
    "brancH_ID": formData.brancH_ID,
    "seM_ID": formData.seM_ID
  }
  return this.http.post(this.url9,data)
}

// RESULT STATUS
getResultStatus(formData: any){

  const payload = {
    "studenT_ID": 0,
    "brancH_ID": formData.brancH_ID,
    "academiC_YEAR_ID": formData.aY_ID,
    "papeR_ID": 0,
    "appearinG_SEM": formData.seM_ID,
    "result": formData.result_Status
  }

  return this.http.post(this.url20, payload);
}

}
