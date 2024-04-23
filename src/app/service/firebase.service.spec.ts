import { TestBed } from '@angular/core/testing';

import { FirebaseDishTypeService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseDishTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDishTypeService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
