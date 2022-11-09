import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SignUpFormComponent } from './signup-form.component'

describe('LoginFormComponent', () => {
  let component: SignUpFormComponent
  let fixture: ComponentFixture<SignUpFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SignUpFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
