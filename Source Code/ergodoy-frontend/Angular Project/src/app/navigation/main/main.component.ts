import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: []
})
export class MainComponent implements OnInit {

  menuItems: MenuItem[];
  selectedMenu: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuItems = [
      { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
      { label: 'Documentation', icon: 'fa fa-fw fa-book' },
      { label: 'Support', icon: 'fa fa-fw fa-support' },
      { label: 'Social', icon: 'fa fa-fw fa-twitter' }
    ];
    this.listenToRouter();

  }


  /**
     * this service listen to everytime the router has changed. It's used it to know the path where the router
     * is, to select the correct menu option.
     */
  listenToRouter() {
    this.router.events.subscribe((value: NavigationEnd) => {
      if (value instanceof NavigationEnd) {
        let aux = value.url.split("/")[1];
        if (aux && aux != '') {
          this.selectedMenu = aux
        } else {
          this.selectedMenu = "customer";
        }
      }
    });
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

}
