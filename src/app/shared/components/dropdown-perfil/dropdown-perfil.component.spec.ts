import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPerfilComponent } from './dropdown-perfil.component';

describe('DropdownPerfilComponent', () => {
  let component: DropdownPerfilComponent;
  let fixture: ComponentFixture<DropdownPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
