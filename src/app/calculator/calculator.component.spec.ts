import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisplayPipe } from '../pipes/display.pipe';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent, DisplayPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should start with a currentNumber at `0`', () => {
    expect(component.currentNumber).toEqual('0');
  });
  it('should start with a actions at empty string', () => {
    expect(component.actions).toEqual('');
  });
  it('should write string in currentNumber input when number is pressed', async () => {

    const button_1 = fixture.debugElement.query(By.css('.button1'))
    const button_2 = fixture.debugElement.query(By.css('.button2'))
    const button_3 = fixture.debugElement.query(By.css('.button3'))

    button_1.triggerEventHandler('click', 'getNumber'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),

      expect(component.currentNumber).toEqual('123');
  });
  it('should write string and operator in action input when operator is pressed , also the current input should stay without operator', async () => {

    const button_1 = fixture.debugElement.query(By.css('.button1'))
    const button_2 = fixture.debugElement.query(By.css('.button2'))
    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const minus = fixture.debugElement.query(By.css('.buttonMinus'))

    button_1.triggerEventHandler('click', 'getNumber'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      minus.triggerEventHandler('click', 'getOperation'),

      expect(component.actions).toEqual('123-');
    expect(component.currentNumber).toEqual('123');
  });
  it('should solve math problem after giveing second operand and second operator', async () => {

    const button_1 = fixture.debugElement.query(By.css('.button1'))
    const button_2 = fixture.debugElement.query(By.css('.button2'))
    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const minus = fixture.debugElement.query(By.css('.buttonMinus'))

    button_1.triggerEventHandler('click', 'getNumber'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      minus.triggerEventHandler('click', 'getOperation'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_1.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),

      expect(component.actions).toEqual('102*');
    expect(component.currentNumber).toEqual('102');
  });
  it('should solve math problem after giveing second operand and pressing result button', async () => {

    const button_1 = fixture.debugElement.query(By.css('.button1'))
    const button_2 = fixture.debugElement.query(By.css('.button2'))
    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const operator_minus = fixture.debugElement.query(By.css('.buttonMinus'))
    const result = fixture.debugElement.query(By.css('.equalSign'))

    button_1.triggerEventHandler('click', 'getNumber'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      operator_minus.triggerEventHandler('click', 'getOperation'),
      button_2.triggerEventHandler('click', 'getNumber'),
      button_1.triggerEventHandler('click', 'getNumber'),
      result.triggerEventHandler('click', 'getResult'),

      expect(component.actions).toEqual('123-21=');
    expect(component.currentNumber).toEqual('102');
  });
  it('should repeat last operator and last number if not given, when pressing result', async () => {

    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const result = fixture.debugElement.query(By.css('.equalSign'))

    button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      result.triggerEventHandler('click', 'getResult'),
      result.triggerEventHandler('click', 'getResult'),

      expect(component.actions).toEqual('9*3=');
    expect(component.currentNumber).toEqual('27');
  });
  it('should repeat last operator and last number if not given, when pressing result', async () => {

    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const result = fixture.debugElement.query(By.css('.equalSign'))

    button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      result.triggerEventHandler('click', 'getResult'),
      result.triggerEventHandler('click', 'getResult'),

      expect(component.actions).toEqual('9*3=');
    expect(component.currentNumber).toEqual('27');
  });
  it('should clear when pressing AC button', async () => {

    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const operator_times = fixture.debugElement.query(By.css('.buttonTimes'))
    const result = fixture.debugElement.query(By.css('.equalSign'))
    const clear = fixture.debugElement.query(By.css('.allClear'))

    button_3.triggerEventHandler('click', 'getNumber'),
      operator_times.triggerEventHandler('click', 'getOperation'),
      result.triggerEventHandler('click', 'getResult'),
      result.triggerEventHandler('click', 'getResult'),
      clear.triggerEventHandler('click', 'clear'),

      expect(component.actions).toEqual('');
    expect(component.currentNumber).toEqual('0');
  });
  it('should remove last char in input display when pressing back button', async () => {

    const button_3 = fixture.debugElement.query(By.css('.button3'))
    const back = fixture.debugElement.query(By.css('.backButton'))

    button_3.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      button_3.triggerEventHandler('click', 'getNumber'),
      back.triggerEventHandler('click', 'backButton'),
      back.triggerEventHandler('click', 'backButton'),

      expect(component.currentNumber).toEqual('33');
  });
});
