
import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const clearEntry = () => {
    setDisplayValue('0');
  }

  const toggleSign = () => {
    setDisplayValue(
      (parseFloat(displayValue) * -1).toString()
    );
  };

  const inputPercent = () => {
     const currentValue = parseFloat(displayValue);
     if (currentValue === 0) return;
     setDisplayValue((currentValue / 100).toString());
  };
  
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '−':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return first / second;
      default:
        return second;
    }
  };
  
  const handleOperatorClick = (op: string) => {
    if (op === '=') {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(displayValue), operator);
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(true); // Allows starting new calculation
      }
    } else {
      performOperation(op);
    }
  };
  
  const clearButtonLabel = displayValue !== '0' && !waitingForSecondOperand ? 'C' : 'AC';

  return (
    <div className="bg-black w-full max-w-sm h-auto rounded-[56px] p-5 shadow-2xl">
      <div className="h-[200px] flex items-end justify-end">
        <Display value={displayValue} />
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        <Button label={clearButtonLabel} onClick={() => clearButtonLabel === 'AC' ? clearAll() : clearEntry()} className="bg-gray-400 text-black hover:bg-gray-300 active:bg-gray-500" />
        <Button label="+/−" onClick={toggleSign} className="bg-gray-400 text-black hover:bg-gray-300 active:bg-gray-500" />
        <Button label="%" onClick={inputPercent} className="bg-gray-400 text-black hover:bg-gray-300 active:bg-gray-500" />
        <Button label="÷" onClick={handleOperatorClick} className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600" />
        
        <Button label="7" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="8" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="9" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="×" onClick={handleOperatorClick} className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600" />
        
        <Button label="4" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="5" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="6" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="−" onClick={handleOperatorClick} className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600" />

        <Button label="1" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="2" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="3" onClick={inputDigit} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="+" onClick={handleOperatorClick} className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600" />

        <Button label="0" onClick={inputDigit} className="col-span-2 w-auto !rounded-full !justify-start pl-7 bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="." onClick={inputDecimal} className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800" />
        <Button label="=" onClick={handleOperatorClick} className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600" />
      </div>
    </div>
  );
};

export default App;
