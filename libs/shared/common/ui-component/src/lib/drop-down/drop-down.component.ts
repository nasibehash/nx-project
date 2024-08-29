import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.component.html',
})
export class DropDownComponent {

  langChanged: OutputEmitterRef<string> = output<string>();
  isOpen: boolean = false;
  option: string = 'En';
  options = input<[]>();

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.isOpen = false;
    this.option = option;
    this.langChanged.emit(this.option);

  }
}
