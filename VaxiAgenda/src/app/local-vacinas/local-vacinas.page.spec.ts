import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalVacinasPage } from './local-vacinas.page';

describe('LocalVacinasPage', () => {
  let component: LocalVacinasPage;
  let fixture: ComponentFixture<LocalVacinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVacinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
