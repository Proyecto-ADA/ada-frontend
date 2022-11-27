import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedArticlesListComponent } from './shared-articles-list.component';

describe('SharedArticlesListComponent', () => {
  let component: SharedArticlesListComponent;
  let fixture: ComponentFixture<SharedArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedArticlesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
