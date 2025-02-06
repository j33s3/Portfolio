import { TestBed } from '@angular/core/testing';

import { StsAuthService } from './sts-auth.service';

describe('StsAuthService', () => {
  let service: StsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
