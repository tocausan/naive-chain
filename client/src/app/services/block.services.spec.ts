import {TestBed, inject} from '@angular/core/testing';

import {BlockServices} from './block.services';

describe('BlockServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockServices]
    });
  });

  it('should be created', inject([BlockServices], (service: BlockServices) => {
    expect(service).toBeTruthy();
  }));
});
