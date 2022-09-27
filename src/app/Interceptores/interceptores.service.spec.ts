import { TestBed } from '@angular/core/testing';

import { InterceptoresService } from './interceptores.service';

describe('InterceptoresService', () => {
  let service: InterceptoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
