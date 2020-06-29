/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LightControlService } from './lightControl.service';

describe('Service: LightControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightControlService]
    });
  });

  it('should ...', inject([LightControlService], (service: LightControlService) => {
    expect(service).toBeTruthy();
  }));
});
