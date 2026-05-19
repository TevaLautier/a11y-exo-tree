import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  AtomicSelectableTree,
  FileNode,
} from './app/atomic-selectable-tree/atomic-selectable-tree';

@Component({
  selector: 'app-root',
  templateUrl: './main.html',
  imports: [AtomicSelectableTree],
})
export class App {
  name = 'Angular';

  nodes: FileNode[] = [
    {
      name: 'Projet Angular',
      type: 'folder',
      expanded: true,
      children: [
        {
          name: 'src',
          type: 'folder',
          expanded: false,
          children: [
            { name: 'app.component.ts', type: 'file' },
            { name: 'app.component.html', type: 'file' },
          ],
        },
        { name: 'package.json', type: 'file' },
        { name: 'angular.json', type: 'file' },
      ],
    },
    {
      name: 'Projet React',
      type: 'folder',
      expanded: true,
      children: [
        {
          name: 'src',
          type: 'folder',
          expanded: false,
          children: [
            { name: 'main.tsx', type: 'file' },
            { name: 'test.tsx', type: 'file' },
          ],
        },
        { name: 'package.json', type: 'file' },
      ],
    },
  ];
}

bootstrapApplication(App);
