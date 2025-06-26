import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeLocalPage } from './home-local.page';

describe('HomeLocalPage', () => {
  let component: HomeLocalPage;
  let fixture: ComponentFixture<HomeLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
