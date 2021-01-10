import { TestBed } from '@angular/core/testing';

import { ProductSellService } from './product-sell.service';

describe('ProductSellService', () => {
  let service: ProductSellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
