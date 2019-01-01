import { TestBed, inject } from '@angular/core/testing';

import { NetworkingareaService } from './networkingarea.service';

describe('NetworkingareaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkingareaService]
    });
  });

  it('should be created', inject([NetworkingareaService], (service: NetworkingareaService) => {
    expect(service).toBeTruthy();
  }));
});
