import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.page.html',
  styleUrls: ['./search-filters.page.scss'],
})
export class SearchFiltersPage implements OnInit {
  @Input() filters: any = {};

  filtersForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.filtersForm = this.fb.group({
      "start-date": ['',[Validators.required]],
      "end-date": ['',[Validators.required]],
    });

    this.filtersForm.get('start-date').setValue( (this.filters?.['start-date']) ?  formatDate(this.filters?.['start-date'], 'yyyy-MM-dd', 'en')/*moment(this.filters?.['start-date']).utc() new Date (this.filters?.['start-date']).toISOString()*/ : '');
    this.filtersForm.get('end-date').setValue( (this.filters?.['end-date']) ?  formatDate(this.filters?.['end-date'], 'yyyy-MM-dd', 'en')/*new Date (this.filters?.['end-date']).toISOString()*/ : '');
    
  }

  clearForm(){
    this.filtersForm.reset();
  }

  async filter(){
    let data = this.filtersForm.value;
    
    data['start-date'] = this.datePipe.transform(data['start-date'], 'yyyy-MM-dd');
    data['end-date'] = this.datePipe.transform(data['end-date'], 'yyyy-MM-dd');
    
    await this.modalCtrl.dismiss(this.filtersForm.value);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }


}
