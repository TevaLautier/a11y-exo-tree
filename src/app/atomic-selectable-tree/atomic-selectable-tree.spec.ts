import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicSelectableTree } from './atomic-selectable-tree';

describe('AtomicSelectableTree', () => {
  let component: AtomicSelectableTree;
  let fixture: ComponentFixture<AtomicSelectableTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomicSelectableTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomicSelectableTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
