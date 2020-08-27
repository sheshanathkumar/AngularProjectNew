import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerListComponent} from './customer-list.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormsModule} from '@angular/forms';


describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let input;
  let submitBtn;
  let compiled;

  const getByTestId = (id) => {
    return compiled.querySelector(`[data-test-id="${id}"]`);
  };

  const pushValue = async (value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    submitBtn.click();
    await fixture.whenStable();
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports : [FormsModule],
        declarations: [CustomerListComponent]
      })
      .overrideComponent(CustomerListComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    input = getByTestId('app-input');
    submitBtn = getByTestId('submit-button');
    fixture.detectChanges();
  });

  it('Should render the initial UI as expected', () => {
    expect(component).toBeTruthy();
    expect(input.value.trim()).toBeFalsy();
    expect(submitBtn.innerHTML).toBe('Add Customer');
    expect(getByTestId('customer-list')).toBeFalsy();
  });

  it('Should add new customers on btn click', async () => {
    const values = ['Steve', 'John', 'Bob'];
    await pushValue('Steve');
    await pushValue('John');
    await pushValue('Bob');
    await fixture.autoDetectChanges(true);
    fixture.detectChanges();

    expect(getByTestId('customer-list')).toBeTruthy();
    values
      .map((value, index) => {
        return {id: `list-item${index}`, value};
      })
      .forEach(data => {
        expect(getByTestId(`${data.id}`).innerHTML).toEqual(data.value);
      });
  });

  it('Should clear the input after submit btn is clicked', async () => {
    await pushValue('Steve');
    await fixture.autoDetectChanges(true);
    await fixture.whenStable();
    expect(getByTestId('customer-list')).toBeTruthy();
    expect(getByTestId(`list-item0`).innerHTML).toEqual('Steve');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(getByTestId('app-input').value).toBeFalsy();
  });

  it('Should not add any customer if input is empty', async () => {
    await pushValue('');
    await fixture.autoDetectChanges(true);
    expect(getByTestId('customer-list')).toBeNull();
    expect(getByTestId(`list-item0`)).toBeNull();
  });
});
