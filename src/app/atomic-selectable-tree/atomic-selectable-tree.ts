import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FileNode {
  name: string;
  type: 'folder' | 'file';
  parent?: FileNode;
  expanded?: boolean;
  selected?: boolean; // Pour le focus (Roving Tabindex)
  checked?: boolean | 'mixed';
  children?: FileNode[];
}
/**
 * NE PAS MODIFIER
 */
@Component({
  selector: 'atomic-selectable-tree',
  imports: [CommonModule],
  templateUrl: './atomic-selectable-tree.html',
  styleUrl: './atomic-selectable-tree.css',
})
export class AtomicSelectableTree implements OnChanges {
  @Input()
  nodes: FileNode[] = [];
  activeNode!: FileNode;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      this.initTree(this.nodes);
      this.activeNode = this.nodes[0];
      this.nodes[0].selected=true;
    }
  }

  // Initialise les parents pour faciliter la navigation "Gauche"
  initTree(nodes: FileNode[], parent?: FileNode) {
    nodes.forEach((n) => {
      n.parent = parent;
      n.selected = false;
      if (n.children) this.initTree(n.children, n);
    });
  }

  handleKeyDown(event: KeyboardEvent, node: FileNode) {
    const visibleNodes = this.getVisibleNodes(this.nodes);
    const index = visibleNodes.indexOf(node);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNode(visibleNodes[index + 1]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusNode(visibleNodes[index - 1]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (node.type === 'folder') {
          if (!node.expanded) node.expanded = true;
          else this.focusNode(node.children?.[0]);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (node.type === 'folder' && node.expanded) {
          node.expanded = false;
        } else {
          this.focusNode(node.parent);
        }
        break;
      case ' ':
        event.preventDefault();
        this.toggleCheck(node);
        break;
    }
  }

  focusNode(node: FileNode | undefined) {
    if (!node) return;
    this.activeNode.selected = false;
    node.selected = true;
    this.activeNode = node;

    // On force le focus HTML sur l'élément sélectionné
    setTimeout(() => {
      const el = document.querySelector(
        '[aria-selected="true"]'
      ) as HTMLElement;
      el?.focus();
    });
  }

  // Récupère uniquement les nœuds qui ne sont pas cachés par un dossier fermé
  private getVisibleNodes(
    nodes: FileNode[],
    result: FileNode[] = []
  ): FileNode[] {
    for (const node of nodes) {
      result.push(node);
      if (node.type === 'folder' && node.expanded && node.children) {
        this.getVisibleNodes(node.children, result);
      }
    }
    return result;
  }

  toggleCheck(node: FileNode) {
    node.checked = node.checked !== true;
    // Logique de cascade à implémenter...
  }
}
