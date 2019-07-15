import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { ConstantFile } from 'src/app/services/constantFile';
import * as storeReducer from '../../store/store.reducer';
import * as StoreAction from '../../store/store.action';
import { Store } from '@ngrx/store';
import { ExpenseModel } from 'src/app/models/espense.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CommonService]
})
export class HomeComponent implements OnInit {
  public currentPageOfPagination = 1;
  public allexpenses: Array<ExpenseModel> = [];
  private costantData = new ConstantFile();
  constructor(private commonService: CommonService, private router: Router, private store: Store<storeReducer.AppState>) { }

  ngOnInit() {
    this.store.select('expense').subscribe(state => {
      this.allexpenses = state.expenses;
      if (this.allexpenses.length > 0) {
        this.commonService.postData(this.costantData.urlExpense, this.allexpenses);
      }
    });
    if (this.commonService.getData(this.costantData.urlExpense) != null) {
    }

  }

  editExpense(i) {
    this.router.navigate(['/expense/editExpense', i]);
  }

  onDeleteExpense(index, name, isForSoftRemove) {

    if (!isForSoftRemove) {
      if (confirm("Are you sure to delete " + name)) {
        this.allexpenses[index].isSoftDeleted = true;
        this.commonService.postData(this.costantData.urlExpense, this.allexpenses);
      }
    } else {
      if (confirm("Are you sure to re do expense " + name)) {
        this.allexpenses[index].isSoftDeleted = false;
        this.commonService.postData(this.costantData.urlExpense, this.allexpenses);
      }
    }
  }

}
