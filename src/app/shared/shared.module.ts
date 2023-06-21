import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { StatComponent } from './controls/stat/stat.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [StatComponent, SearchFilterPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    StatComponent,
    SearchFilterPipe,
    NgbAccordionModule,
    
  ],
})
export class SharedModule {}
