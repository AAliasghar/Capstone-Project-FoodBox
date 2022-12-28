import { TestBed } from '@angular/core/testing';

import { FoodBoxShopFormService } from './food-box-shop-form.service';

describe('FoodBoxShopFormService', () => {
  let service: FoodBoxShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodBoxShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
