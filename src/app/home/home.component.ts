import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
interface data {
  name: string;
  links: [string];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projectName: string;

  marked = false;
  theCheckbox = false;
  showModal = false;
  links = [
    'www.reddit.com/r/dataisbeautiful',
    'www.stackoverflow.com',
    'www.apple.com',
  ];
  selectedLinks = [true, false, false];

  projects = [
    {
      name: 'project1',
      links: ['www.facebook.com', 'www.google.com', 'www.apple.com'],
    },
    {
      name: 'project2',
      links: ['www.facebook.com', 'www.google.com', 'www.apple.com'],
    },
    {
      name: 'project3',
      links: ['www.facebook.com', 'www.google.com', 'www.apple.com'],
    },
  ];

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    this.projects = JSON.parse(localStorage.getItem('projects'));
    if (this.projects == null) {
      this.projects = [];
    }
  }
  /**
   * This Function opens the Create Project Modal
   */
  openModal(): void {
    this.showModal = true;
  }


  /**
   * This Function closes the Create Project Modal
   */
  closeModal(): void {
    this.showModal = false;
  }


  /**
   * This Function passes the project data which has been clicked
   * and saves that project detail in localStorage for persistence.
   *  @param data - Object corresponds to the selected project
   */
  projectDetails(data) {
    localStorage.setItem('project', JSON.stringify(data));
    this.data.changeMessage(data);
  }


  /**
   * This Function creates new project and navigates to new project window
   *  @param form - Object corresponds to the form data
   */
  onSubmit(form: NgForm) {
    if (form.valid) {
      let obj = { name: '', links: [] };
      obj['name'] = this.projectName;
      for (let i in this.selectedLinks) {
        if (this.selectedLinks[i]) {
          obj['links'].push(this.links[i]);
        }
      }
      this.projects.push(obj);
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.closeModal();
      this.projectDetails(obj);
      this.router.navigate(['/projects']);
    }
  }
}
