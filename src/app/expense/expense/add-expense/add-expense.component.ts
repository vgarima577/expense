import { Component, OnInit } from '@angular/core';
import { ExpenseModel } from '../../../models/espense.model';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantFile } from 'src/app/services/constantFile';
import * as storeReducer from '../../../store/store.reducer';
import { Store } from '@ngrx/store';
import * as StoreAction from '../../../store/store.action';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [CommonService]
})
export class AddExpenseComponent implements OnInit {

  public expenseDetail: ExpenseModel = {
    categoryName: null,
    itemName: null,
    amount: null,
    date: null,
    isSoftDeleted: false
  };
  public allcategory: any[] = [];
  public allexpenses: any[] = [];
  private costantData = new ConstantFile(); // get all constant url 
  constructor(private commonService: CommonService, private router: Router, private store: Store<storeReducer.AppState>) { }

  ngOnInit() {
    if (this.commonService.getData(this.costantData.urlCategory) != null) {
      this.allcategory = this.commonService.getData(this.costantData.urlCategory);
    } else {
      alert('Please add category first');
      this.router.navigate(['settings']);
    }
    if (this.commonService.getData(this.costantData.urlExpense) != null) {
      this.allexpenses = this.commonService.getData(this.costantData.urlExpense);
    }
  }

  // add expense but category name and expense date is required
  onSubmitExpense(ngForm) {

    if (this.expenseDetail.categoryName != null && this.expenseDetail.date != null) {
      this.commonService.postData(this.costantData.urlExpense, this.allexpenses);
      this.store.dispatch(new StoreAction.AddExpensesAction({ expensesData: this.expenseDetail }));
      this.router.navigate(['']);
    } else {
      alert('Please enter valid data');
    }

  }

}
