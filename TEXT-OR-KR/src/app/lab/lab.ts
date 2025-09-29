import {Component, inject} from '@angular/core';
import {IMenu} from '@app/interfaces/i-menu';
import {RouterLink, Router, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-lab',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    RouterOutlet
  ],
  templateUrl: './lab.html',
  styleUrl: './lab.scss'
})
export class Lab {

  title = "연구소";

  router = inject(Router);

  labMenus: IMenu[] = [
    {id: 0, url: '/Lab/Autocomplet', name: 'Autocomplet', icon: 'menu'},
    {id: 1, url: '/Lab/Badge', name: 'Badge', icon: 'menu'},
    {id: 2, url: '/Lab/BottomSheet', name: 'bottom Sheet', icon: 'menu'},
    {id: 3, url: '/Lab/Button', name: 'Button', icon: 'menu'},
    {id: 4, url: '/Lab/Card', name: 'Card', icon: 'menu'},
    {id: 5, url: '/Lab/Checkbox', name: 'Checkbox', icon: 'menu'},
    {id: 6, url: '/Lab/Chips', name: 'Chips', icon: 'menu'},
    {id: 7, url: '/Lab/Datepicker', name: 'Date Picker', icon: 'menu'},
    {id: 8, url: '/Lab/Dialog', name: 'Dialog', icon: 'menu'},
    {id: 9, url: '/Lab/Form', name: 'Form', icon: 'menu'},
    {id: 10, url: '/Lab/List', name: 'List', icon: 'menu'},
    {id: 11, url: '/Lab/ProgressBar', name: 'ProgressBar', icon: 'menu'},
    {id: 12, url: '/Lab/Select', name: 'Select', icon: 'menu'},
    {id: 13, url: '/Lab/Sidenav', name: 'Side Nav', icon: 'menu'},
    {id: 14, url: '/Lab/Slider', name: 'Slider', icon: 'menu'},
    {id: 15, url: '/Lab/Snackbar', name: 'Snackbar', icon: 'menu'},
    {id: 16, url: '/Lab/Table', name: 'Table', icon: 'menu'},
    {id: 17, url: '/Lab/Tabs', name: 'Tabs', icon: 'menu'},
    {id: 18, url: '/Lab/TimePicker', name: 'Time Picker', icon: 'menu'},
    {id: 19, url: '/Lab/Tooltip', name: 'Tooltip', icon: 'menu'},
    {id: 20, url: '/Lab/Tree', name: 'Tree', icon: 'menu'},
    {id: 21, url: '/Lab/AddressForm', name: 'Address Form', icon: 'menu'},
    {id: 22, url: '/Lab/Expansion', name: 'Expansion', icon: 'menu'},
  ];
}
