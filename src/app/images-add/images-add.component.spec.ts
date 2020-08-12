import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesAddComponent } from './images-add.component';

describe('ImagesAddComponent', () => {
  let component: ImagesAddComponent;
  let fixture: ComponentFixture<ImagesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
