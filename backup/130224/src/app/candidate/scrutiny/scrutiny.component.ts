import { Component, OnInit } from '@angular/core';
import { ScrutinyService } from '../../services/scrutiny.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';


@Component({
  selector: 'app-scrutiny',
  templateUrl: './scrutiny.component.html',
  styleUrls: ['./scrutiny.component.css']
})
export class ScrutinyComponent implements OnInit {

  showScrutnyData:any;
  showScrutiny:any;
  ROLE_ID:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  errormessage: boolean = false;
  updateSuccessmessage: boolean = false;

  totalPages: any;
  pageSize: number = 6;
  currentPage: number = 1;
  pageRange: number = 6;
  itemsPerPage: number =6;
  pageOfItems: any[] = [];

  
filteredItems: any[] = [];
searchFilters: { [key: string]: string } = {};


  constructor(private serviceData: ScrutinyService) {}

  ngOnInit(): void {
    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    this.serviceData.showScrutiny().subscribe((data) => {
      this.showScrutnyData = data;
      this.showScrutiny = this.showScrutnyData['Data'];
      console.log("this.showScrutiny");
      console.log(this.showScrutiny);
      this.updateFilteredItems();
    })
  }

   
getVisiblePages(): number[] {
  const visiblePages: number[] = [];
  const startPage = Math.max(1, this.currentPage - Math.floor(this.pageRange / 2));
  const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);

  for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
  }

  return visiblePages;
}



  // Serach filter Start

   updateFilteredItems() {
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showScrutiny.filter((item:any) =>
        Object.keys(this.searchFilters).every(
          (key) =>
            !this.searchFilters[key] ||
            (item[key] &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
        )
      );
    } else {
      this.filteredItems = this.showScrutiny.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
  }

    paginate(array: any[], pageNumber: number, pageSize: number): any[] {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return array.slice(startIndex, endIndex);
    }  

    onChangePage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.updateFilteredItems();
      }
    }
  
    onPreviousButtonClick(): void {
      if (this.currentPage > 1) {
        this.onChangePage(this.currentPage - 1);
      }
    }
    pagesArray(): number[] {
      return Array(this.totalPages).fill(0).map((_, index) => index + 1);
    }
    onNextButtonClick(): void {
      if (this.currentPage < this.totalPages) {
        this.onChangePage(this.currentPage + 1);
      }
    }

// Serach filter End


getScrutinyFormdata(data: any){


}


}
