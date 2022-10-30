import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuizzConfirmationDialogComponent } from './send-quizz-confirmation-dialog.component';

describe('SendQuizzConfirmationDialogComponent', () => {
  let component: SendQuizzConfirmationDialogComponent;
  let fixture: ComponentFixture<SendQuizzConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQuizzConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendQuizzConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
