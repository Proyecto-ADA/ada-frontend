import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzSendedDialogComponent } from './quizz-sended-dialog.component';

describe('QuizzSendedDialogComponent', () => {
  let component: QuizzSendedDialogComponent;
  let fixture: ComponentFixture<QuizzSendedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzSendedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzSendedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
