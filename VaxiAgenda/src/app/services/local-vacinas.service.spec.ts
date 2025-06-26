import { TestBed } from '@angular/core/testing';

import { LocalVacinasService } from './local-vacinas.service';

describe('LocalVacinasService', () => {
  let service: LocalVacinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalVacinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
