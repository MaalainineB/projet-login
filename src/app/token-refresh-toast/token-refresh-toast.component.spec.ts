import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRefreshToastComponent } from './token-refresh-toast.component';

describe('TokenRefreshToastComponent', () => {
  let component: TokenRefreshToastComponent;
  let fixture: ComponentFixture<TokenRefreshToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenRefreshToastComponent]
    });
    fixture = TestBed.createComponent(TokenRefreshToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
