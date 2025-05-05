import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent {
  menuItems: MenuItem[] = [
    {
      name: 'Candidate',
      icon: 'person',
      link: '/Administrator',
    },
    {
      name: 'Openings',
      icon: 'work',
      link: '/Administrator/Openings',
    },
    {
      name: 'Interview',
      icon: 'videocam',
      link: '/Administrator/Interview',
    },
    {
      name: 'Test',
      icon: 'assignment',
      link: '/Administrator/Test',
    },
  ];
}
