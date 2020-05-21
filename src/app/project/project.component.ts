import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
interface data {
  name: string;
  links: [];
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: any;
  constructor(private data: DataService, private router: Router) {}

   /**
   * This LifeCycle hook runs on Intialisation to
   * initialise project details from DataService or localstorage
   */
  ngOnInit() {
    this.data.currentMessage.subscribe((project) => {
      this.project = project;
      if (Object.keys(project).length === 0) {
        this.project = JSON.parse(localStorage.getItem('project'));
      }
    });
  }

  /**
   * This Callback is implemented when component is destroyed
   * to clerar project details in localstorage
   */
  ngOnDestroy() {
    localStorage.removeItem('project');
  }

   /**
   * Callback to open links in new window
   */
  openWebsite(website) {
    let link = 'https://' + website;
    window.open(link);
  }
}
