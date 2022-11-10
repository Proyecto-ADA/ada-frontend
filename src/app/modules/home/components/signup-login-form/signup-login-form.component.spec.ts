import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SignUpLoginFormComponent } from './signup-login-form.component'

describe('LoginFormComponent', () => {
  let component: SignUpLoginFormComponent
  let fixture: ComponentFixture<SignUpLoginFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpLoginFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SignUpLoginFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
