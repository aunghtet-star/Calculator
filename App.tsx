
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import Display from './components/Display';
import Button from './components/Button';

export default function App() {
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
      case '+': return first + second;
      case '−': return first - second;
      case '×': return first * second;
      case '÷': return first / second;
      case 'x^y': return Math.pow(first, second);
      default: return second;
    }
  };
  
  const handleOperatorClick = (op: string) => {
    if (op === '=') {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(displayValue), operator);
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
      }
    } else {
      performOperation(op);
    }
  };

  const clearButtonLabel = displayValue !== '0' && !waitingForSecondOperand ? 'C' : 'AC';

  const handleButtonClick = (label: string) => {
    if (!isNaN(Number(label)) || label === '.') {
      if (label === '.') {
        inputDecimal();
      } else {
        inputDigit(label);
      }
    } else if (label === clearButtonLabel) {
      if (clearButtonLabel === 'AC') {
        clearAll();
      } else {
        clearEntry();
      }
    } else if (label === '+/−') {
      toggleSign();
    } else {
      handleOperatorClick(label);
    }
  };
  
  const getButtonStyle = (label: string) => {
    if (['÷', '×', '−', '+', '='].includes(label)) return styles.operatorButton;
    if ([clearButtonLabel, '+/−', 'x^y'].includes(label)) return styles.specialButton;
    return styles.digitButton;
  };
  
  const getTextStyle = (label: string) => {
    if ([clearButtonLabel, '+/−', 'x^y'].includes(label)) return styles.specialButtonText;
    if (label.length > 2) return {fontSize: 28};
    return {};
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Display value={displayValue} />
      </View>
      <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <Button label={clearButtonLabel} onClick={handleButtonClick} buttonStyle={getButtonStyle(clearButtonLabel)} textStyle={getTextStyle(clearButtonLabel)} />
            <Button label="+/−" onClick={handleButtonClick} buttonStyle={getButtonStyle('+/−')} textStyle={getTextStyle('+/−')} />
            <Button label="x^y" onClick={handleButtonClick} buttonStyle={getButtonStyle('x^y')} textStyle={getTextStyle('x^y')} />
            <Button label="÷" onClick={handleButtonClick} buttonStyle={getButtonStyle('÷')} textStyle={getTextStyle('÷')} />
          </View>
          <View style={styles.row}>
            <Button label="7" onClick={handleButtonClick} buttonStyle={getButtonStyle('7')} />
            <Button label="8" onClick={handleButtonClick} buttonStyle={getButtonStyle('8')} />
            <Button label="9" onClick={handleButtonClick} buttonStyle={getButtonStyle('9')} />
            <Button label="×" onClick={handleButtonClick} buttonStyle={getButtonStyle('×')} />
          </View>
          <View style={styles.row}>
            <Button label="4" onClick={handleButtonClick} buttonStyle={getButtonStyle('4')} />
            <Button label="5" onClick={handleButtonClick} buttonStyle={getButtonStyle('5')} />
            <Button label="6" onClick={handleButtonClick} buttonStyle={getButtonStyle('6')} />
            <Button label="−" onClick={handleButtonClick} buttonStyle={getButtonStyle('−')} />
          </View>
           <View style={styles.row}>
            <Button label="1" onClick={handleButtonClick} buttonStyle={getButtonStyle('1')} />
            <Button label="2" onClick={handleButtonClick} buttonStyle={getButtonStyle('2')} />
            <Button label="3" onClick={handleButtonClick} buttonStyle={getButtonStyle('3')} />
            <Button label="+" onClick={handleButtonClick} buttonStyle={getButtonStyle('+')} />
          </View>
          <View style={styles.row}>
            <Button label="0" onClick={handleButtonClick} buttonStyle={getButtonStyle('0')} isZero={true} />
            <Button label="." onClick={handleButtonClick} buttonStyle={getButtonStyle('.')} />
            <Button label="=" onClick={handleButtonClick} buttonStyle={getButtonStyle('=')} />
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'flex-end' },
  displayContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  buttonsContainer: { paddingHorizontal: 6, paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  digitButton: { backgroundColor: '#333' },
  specialButton: { backgroundColor: '#A5A5A5' },
  operatorButton: { backgroundColor: '#F1A33C' },
  specialButtonText: { color: '#000', fontSize: 30 }
});
