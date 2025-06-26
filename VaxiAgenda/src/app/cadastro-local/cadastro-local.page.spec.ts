import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroLocalPage } from './cadastro-local.page';

describe('CadastroLocalPage', () => {
  let component: CadastroLocalPage;
  let fixture: ComponentFixture<CadastroLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
