import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from './components/Button/Button';
import { calculate } from './utils/calculate';
import { operatorRegExp } from './utils/regex';
import { getLastSymbols } from './utils/get-last-symbols';
import { handleKeyboardEvents } from './utils/keyboard-events';
import { formatResult } from './utils/format-result';
import { ThemeContext } from './providers/ThemeContextProvider';
import { Switch } from './components/Switch/Switch';
import { formatExpression } from './utils/format-expression';
import { getCorrectedExpression } from './utils/get-corrected-expression';
import { changeSign } from './utils/change-sign';
// import DeleteIcon from './assets/icons/delete-icon.svg';

import styles from './app.module.css';

export const App = () => {
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isShowRes, setIsShowRes] = useState<boolean>(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const h1Ref = useRef<HTMLHeadingElement>(null);

  const calc = () => {
    try {
      const { last, secondLast } = getLastSymbols(value);
      let expr = value;
      // считает рез если ласт + +- ...
      if (operatorRegExp.test(secondLast) && last === '-') {
        expr = expr.slice(0, -2);
      } else if (operatorRegExp.test(last)) {
        expr = expr.slice(0, -1);
      }

      setResult(calculate(expr));
      setError('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const clear = () => {
    setValue('');
    setResult(0);
  };

  const handleButtonClick = (char: string): void => {
    try {
      setIsShowRes(false);

      setValue(getCorrectedExpression(value, char));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  // скрол до конца
  useEffect(() => {
    calc();
    if (h1Ref.current) {
      h1Ref.current.scrollLeft = h1Ref.current.scrollWidth;
    }
  }, [value]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) =>
      handleKeyboardEvents(e, handleCalculate, clear, handleButtonClick, handleDeleteChar);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [value, clear, handleButtonClick]);

  const handleDeleteChar = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleChangeSign = () => {
    setValue((prev) => changeSign(prev));
  };

  // по ентер который
  const handleCalculate = () => {
    setValue(result.toString());
    setIsShowRes(true);
  };

  console.log(theme);

  return (
    <div className={styles.center}>
      <div className={styles.app}>
        <div className={styles.result}>
          <div className={styles.switch}>
            <Switch theme={theme} toggleTheme={toggleTheme} />
          </div>
          <h1 ref={h1Ref}>{formatExpression(value)}</h1>
          <h5>{value.length !== 0 && !isShowRes ? formatResult(result) : ''}</h5>
          <h2>{error}</h2>
        </div>
        <div className={styles.buttons}>
          <Button onClick={() => clear()} color="lightgray">
            AC
          </Button>
          <Button onClick={handleChangeSign} color="lightgray">
            +/-
          </Button>
          <Button onClick={() => handleButtonClick('%')} color="lightgray">
            %
          </Button>
          <Button onClick={() => handleButtonClick('/')} color="blue">
            /
          </Button>

          <Button onClick={() => handleButtonClick('7')}>7</Button>
          <Button onClick={() => handleButtonClick('8')}>8</Button>
          <Button onClick={() => handleButtonClick('9')}>9</Button>
          <Button onClick={() => handleButtonClick('*')} color="blue">
            x
          </Button>

          <Button onClick={() => handleButtonClick('4')}>4</Button>
          <Button onClick={() => handleButtonClick('5')}>5</Button>
          <Button onClick={() => handleButtonClick('6')}>6</Button>
          <Button onClick={() => handleButtonClick('-')} color="blue">
            -
          </Button>

          <Button onClick={() => handleButtonClick('1')}>1</Button>
          <Button onClick={() => handleButtonClick('2')}>2</Button>
          <Button onClick={() => handleButtonClick('3')}>3</Button>
          <Button onClick={() => handleButtonClick('+')} color="blue">
            +
          </Button>

          <Button onClick={() => handleButtonClick('0')}>0</Button>
          <Button onClick={() => handleButtonClick('.')}>.</Button>
          <Button onClick={handleDeleteChar}>
            {/* <img src={DeleteIcon} alt="delete char" /> */}
            <svg
              width="27"
              height="18"
              viewBox="0 0 27 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.08582 0H9.50003H25.5H26.5V1V17V18H25.5H9.50003H9.08582L8.79292 17.7071L0.792922 9.70711L0.0858154 9L0.792922 8.29289L8.79292 0.292893L9.08582 0ZM9.91424 2L2.91424 9L9.91424 16H24.5V2H9.91424ZM13.5 4.58578L14.2071 5.29288L16.5 7.58578L18.7929 5.29289L19.5 4.58579L20.9142 6L20.2071 6.70711L17.9142 9L20.2071 11.2929L20.9142 12L19.5 13.4142L18.7929 12.7071L16.5 10.4142L14.2071 12.7071L13.5 13.4142L12.0858 12L12.7929 11.2929L15.0858 9L12.7929 6.7071L12.0858 5.99999L13.5 4.58578Z"
                fill={`${theme === 'dark' ? 'black' : 'white'}`}
              />
            </svg>
          </Button>
          <Button color="blue" onClick={handleCalculate}>
            =
          </Button>
        </div>
      </div>
    </div>
  );
};
