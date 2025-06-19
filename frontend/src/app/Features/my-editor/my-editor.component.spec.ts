import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEditorComponent } from './my-editor.component';

describe('MyEditorComponent', () => {
  let component: MyEditorComponent;
  let fixture: ComponentFixture<MyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
