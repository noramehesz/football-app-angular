import { TestBed } from '@angular/core/testing';

import { ShareCompetitionsService } from './share-competitions.service';

describe('ShareCompetitionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareCompetitionsService = TestBed.get(ShareCompetitionsService);
    expect(service).toBeTruthy();
  });
});
