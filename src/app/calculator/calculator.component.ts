import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  actions = '';
  currentNumber = '0';
  operatorFirst: string = null;
  operatorSecond: string = null;
  firstOperand: string = null;
  secondOperand: string = null;
  numberComplated = false;
  waitForSecondNumber = false;
  sendString: string = '';
  showHistory = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this._getPressedKey(event);
  }

  public getNumber(num: string): void {
    this.numberComplated = true;
    if (this.waitForSecondNumber) {
      this.currentNumber = num;
      this.waitForSecondNumber = false;
    } else if (this.currentNumber === '0') {
      this.currentNumber = num;
    } else {
      this.currentNumber += num;
    }
  }
  public getDecimal(): void {
    if (this.waitForSecondNumber) {
      this.currentNumber = '0' + '.';
      this.waitForSecondNumber = false;
    }
    this.numberComplated = true;
    this.waitForSecondNumber = false;
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  public getOperation(op: string): void {
    this._removeDecimal();
    if (!this.numberComplated && !this.firstOperand) {
      this.firstOperand = '0';
      this.actions = this.firstOperand;
    }
    if (this.numberComplated && !this.firstOperand) {
      this.firstOperand = this.currentNumber;
      this.actions = this.firstOperand;
      this.numberComplated = false;
    }
    if (this.numberComplated && !this.secondOperand) {
      this.secondOperand = this.currentNumber;
      this.actions = this.actions + this.secondOperand;
      this.numberComplated = false;
    }
    if (this.firstOperand && !this.secondOperand) {
      this.operatorFirst = op;
      this.actions = this.firstOperand + this.operatorFirst;
    }
    if (this.firstOperand && this.secondOperand) {
      this.operatorSecond = op;
      this.actions =
        this.firstOperand +
        this.operatorFirst +
        this.secondOperand +
        this.operatorSecond;
      this.currentNumber = this._doOperation(
        this.firstOperand,
        this.secondOperand,
        this.operatorFirst
      ).toString();
      // send this to history component
      this.sendString =
        this.firstOperand +
        this.operatorFirst +
        this.secondOperand +
        '=' +
        this.currentNumber;
      this.actions = this.currentNumber + op;
      this.operatorFirst = this.operatorSecond;
      this.operatorSecond = null;
      this.firstOperand = this.currentNumber;
      this.secondOperand = null;
      this.numberComplated = false;
    }
    this.waitForSecondNumber = true;
  }
  public getResult(): void {
    this._removeDecimal();
    if (!this.firstOperand) {
      this.actions = this.currentNumber + '=';
    } else {
      this.secondOperand = this.currentNumber;
      this.actions =
        this.firstOperand + this.operatorFirst + this.secondOperand + '=';
      this.currentNumber = this._doOperation(
        this.firstOperand,
        this.secondOperand,
        this.operatorFirst
      ).toString();
      // send this to history component
      this.sendString = this.actions + this.currentNumber;
      this.numberComplated = false;
    }
    this.waitForSecondNumber = true;
  }
  public back(): void {
    if (this.actions !== '') {
      this.actions = '';
    } else {
      if (this.currentNumber.length === 1) {
        this.currentNumber = '0';
      } else if (this.currentNumber.length > 1) {
        this.currentNumber = this.currentNumber.slice(0, -1);
      }
    }
  }
  private _doOperation(
    firstOperand: string,
    secondOperand: string,
    operator: string
  ): number {
    let result = 0;
    this._removeDecimal();
    switch (operator) {
      case '+':
        return (result = Number(firstOperand) + Number(secondOperand));
      case '-':
        return (result = Number(firstOperand) - Number(secondOperand));
      case '*':
        return (result = Number(firstOperand) * Number(secondOperand));
      case '/':
        return (result = Number(firstOperand) / Number(secondOperand));
    }
  }
  private _getPressedKey(event: KeyboardEvent): void {
    switch (event.key) {
      case '+':
        return this.getOperation('+');
      case '*':
        return this.getOperation('*');
      case '/':
        return this.getOperation('/');
      case '-':
        return this.getOperation('-');
      case 'Enter':
        return this.getResult();
      case '.':
        return this.getDecimal();
      case ',':
        return this.getDecimal();
      case '0':
        return this.getNumber('0');
      case '1':
        return this.getNumber('1');
      case '2':
        return this.getNumber('2');
      case '3':
        return this.getNumber('3');
      case '4':
        return this.getNumber('4');
      case '5':
        return this.getNumber('5');
      case '6':
        return this.getNumber('6');
      case '7':
        return this.getNumber('7');
      case '8':
        return this.getNumber('8');
      case '9':
        return this.getNumber('9');
      case 'Backspace':
        return this.back();
      case 'Delete':
        return this.clear();
    }
  }
  private _removeDecimal() {
    if (this.currentNumber.charAt(this.currentNumber.length - 1) === '.') {
      this.currentNumber = this.currentNumber.slice(0, -1);
    }
  }

  public clear(): void {
    this.actions = '';
    this.currentNumber = '0';
    this.operatorFirst = null;
    this.operatorSecond = null;
    this.firstOperand = null;
    this.secondOperand = null;
    this.numberComplated = false;
    this.waitForSecondNumber = false;
  }
  constructor() { }

  ngOnInit(): void { }
}
