import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/categorie';



@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  categorieToDisplay: number[] = [];
  faFilter = faFilter;
  categoryDetailsClicked: boolean = false;
  @Input() allCategories!: Category[];
  @Output() categoryEnvoiParents = new EventEmitter<number[]>();

  onCheckCategory(e: any) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.categorieToDisplay.push(+target.value);
    } else {
      this.categorieToDisplay = this.categorieToDisplay.filter(
        (category_id) => category_id !== +target.value
      );
    }
    this.categoryEnvoiParents.emit(this.categorieToDisplay);
  }

  onDetailsClicked(event: Event) {
    event.stopPropagation();
    this.categoryDetailsClicked = !this.categoryDetailsClicked;
  }
}
