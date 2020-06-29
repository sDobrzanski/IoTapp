/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WakeMeUpService } from './wakeMeUp.service';

describe('Service: WakeMeUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WakeMeUpService]
    });
  });

  it('should ...', inject([WakeMeUpService], (service: WakeMeUpService) => {
    expect(service).toBeTruthy();
  }));
});
