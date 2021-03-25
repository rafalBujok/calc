import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  actions: string = '';
  currentNumber = '0';
  operatorFirst: string = null;
  operatorSecond: string = null;
  firstOperand: string = null;
  secondOperand: string = null;
  numberComplated: boolean = false;
  waitForSecondNumber: boolean = false;


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
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  public getOperation(op: string): void {
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
      this.actions = this.firstOperand + this.operatorFirst + this.secondOperand + this.operatorSecond;
      this.currentNumber = this._doOperation(this.firstOperand, this.secondOperand, this.operatorFirst).toString();
      if (this.operatorSecond !== '=') {
        this.actions = this.currentNumber + op;
        this.operatorFirst = this.operatorSecond;
      } else {
        this.operatorFirst = null;
      }
      this.firstOperand = this.currentNumber;
      this.operatorSecond = null;
      this.secondOperand = null;

    }

    this.waitForSecondNumber = true;
    console.log(this.firstOperand, this.secondOperand, this.operatorFirst, this.operatorSecond)
  }

  private _doOperation(firstOperand: string, secondOperand: string, operator: string): number {
    console.log(firstOperand, secondOperand, operator);
    let result = 0;
    switch (operator) {
      case '+':
        return result = (Number(firstOperand) + Number(secondOperand));
      case '-':
        return result = (Number(firstOperand) - Number(secondOperand));
      case '*':
        return result = (Number(firstOperand) * Number(secondOperand));
      case '/':
        return result = (Number(firstOperand) / Number(secondOperand));
      case '=':
        return result = (Number(secondOperand));
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

  ngOnInit(): void {
  }

}
