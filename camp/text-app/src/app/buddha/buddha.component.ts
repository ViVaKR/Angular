import { Component } from '@angular/core';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: '경전',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];


@Component({
  selector: 'app-buddha',
  standalone: true,
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './buddha.component.html',
  styleUrl: './buddha.component.scss'
})
export class BuddhaComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

}
