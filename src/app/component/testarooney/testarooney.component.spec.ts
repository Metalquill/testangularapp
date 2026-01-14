import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestarooneyComponent } from './testarooney.component';

describe('TestarooneyComponent', () => {
  let component: TestarooneyComponent;
  let fixture: ComponentFixture<TestarooneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestarooneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestarooneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
