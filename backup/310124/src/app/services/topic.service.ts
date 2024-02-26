import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util'; 

@Injectable({
  providedIn: 'root'
})
export class TopicService {

 

  url=environment.baseUrl+"api/Topic";

  // userId = environment.userId;

  selectedFile: any;

  constructor(private http: HttpClient) { }

  


  //  showTopic(){
  
  //   //  var data= "ID=" + 0 + "&TOPIC_NAME=" + "string" + "&CHAPTER_ID=" + 1 + "&CONTENT_PATH=" + "string" + "&STATUS=" + true + "&ADDEDBY=" + "string" + "&UPDATEDBY=" + "string" + "&MODE="+ "V";
  
  // var data={
  //     "ID":0,
  //     "TOPIC_NAME": "String",
  //     "CHAPTER_ID": 1,
  //     "CONTENT_PATH":"Topic/",
  //     "STATUS":true,
  //     "ADDEDBY":"1",
  //     "UPDATEDBY":"1",
  //     "MODE":"V"
  //   }
    
  //   console.log("data");
  //   console.log(data);
  //   return this.http.post<any>(this.url,data);
  // }


  showTopic() {
    const userId = getFromLocalStorage('userId');
    // Create a new FormData object to send form data
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
    data.append('TOPIC_NAME', 'string');
    data.append('CHAPTER_ID', '0');
    
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
    }

    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');

    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
  }



  // editTopic(formData:any) {
  //   const data = new FormData();
  //   data.append('ID', formData.ID);
  //   data.append('TOPIC_NAME', formData.TOPIC_NAME);
  //   data.append('CHAPTER_ID', formData.CHAPTER_ID);
  //   if (this.selectedFile) {
  //     data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
  //   }
  //   data.append('STATUS', 'true');
  //   data.append('ADDEDBY', '1');
  //   data.append('UPDATEDBY', '1');
  //   data.append('MODE', 'U');

  //   return this.http.post(this.url, data);
  // }



//   statusTopic(formData:any){
//     console.log(formData.id);
//    var data:any;
//    if(formData.STATUS == false){
//       const data = new FormData();
//       data.append('ID', formData.ID);
//       data.append('TOPIC_NAME', "string");
//       data.append('CHAPTER_ID', "");
//       if (this.selectedFile) {
//         data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
//       }
//       data.append('STATUS', 'true');
//       data.append('ADDEDBY', '1');
//       data.append('UPDATEDBY', '1');
//       data.append('MODE', 'I');
//    }
//    else if (formData.STATUS == true){
//     const data = new FormData();
//     data.append('ID', formData.ID);
//     data.append('TOPIC_NAME', "string");
//     data.append('CHAPTER_ID', "");
//     if (this.selectedFile) {
//       data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
//     }
//     data.append('STATUS', 'false');
//     data.append('ADDEDBY', '1');
//     data.append('UPDATEDBY', '1');
//     data.append('MODE', 'I');
//    }
//    return this.http.post(this.url,data)
//  }


statusTopic(formData: any) {
  const userId = getFromLocalStorage('userId');
  // Create a FormData object to store the data
  const data = new FormData();

  // Always append these values
  data.append('ID', formData.ID);
  data.append('TOPIC_NAME', 'string');
  data.append('CHAPTER_ID', '0');

  // Check the status and append accordingly
  if (formData.STATUS === false) {
    data.append('STATUS', 'true'); // Toggle the status
  } else if (formData.STATUS === true) {
    data.append('STATUS', 'false'); // Toggle the status
  }

  // Check if a file is selected before appending it to FormData
  if (this.selectedFile) {
    data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
  }

  if (userId !== null) {
    data.append('ADDEDBY', userId);
  }
  if (userId !== null) {
    data.append('UPDATEDBY', userId);
  }
  data.append('MODE', 'I');

  return this.http.post(this.url, data);
}

}
