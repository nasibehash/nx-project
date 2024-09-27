import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageItem } from '../data-access/models/package-items';

@Component({
  selector: 'lib-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent {
  packageItems: PackageItem [] = [
    {
      id: 1,
      name: 'tab'
    },
    {
      id: 2,
      name: 'button'
    },
  ];

  selectPackage(item: PackageItem) {
    const prevItem = this.packageItems.find((i) => i.isActive);
    if (prevItem) {
      prevItem.isActive = false;
    }
    item.isActive = true;
  }
}
