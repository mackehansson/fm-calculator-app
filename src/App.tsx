import React, { useEffect, useRef, useState } from "react";
import { ReactFitty } from "react-fitty";
import { CalcMethod, Themes } from "./models";

const App = () => {
    const [screen, setScreen] = useState<string>("0");
    const [memoryA, setMemoryA] = useState<string | null>(null);
    const [memoryB, setMemoryB] = useState<string | null>(null);
    const [switchedMemory, setSwitchedMemory] = useState(false);
    const [calcMethod, setCalcMethod] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState<Themes>(Themes.SYSTEM);

    const setNumber = (num: string) => {
        if (!switchedMemory) {
            if (!memoryA) {
                setScreen(num);
                setMemoryA(num);
            } else {
                setScreen(screen + num);
                setMemoryA(memoryA + num);
            }
        } else {
            if (!memoryB) {
                setScreen(num);
                setMemoryB(num);
            } else {
                setScreen(screen + num);
                setMemoryB(memoryB + num);
            }
        }
    };

    const add = () => {
        setScreen(" ");
        setSwitchedMemory(true);
        setCalcMethod(CalcMethod.ADD);
        setTimeout(() => {
            if (memoryA) {
                setScreen(memoryA);
            }
        }, 100);
    };
    const minus = () => {
        setScreen(" ");
        setSwitchedMemory(true);
        setCalcMethod(CalcMethod.MINUS);
        setTimeout(() => {
            if (memoryA) {
                setScreen(memoryA);
            }
        }, 100);
    };
    const multiply = () => {
        setScreen(" ");
        setSwitchedMemory(true);
        setCalcMethod(CalcMethod.MULTIPLY);
        setTimeout(() => {
            if (memoryA) {
                setScreen(memoryA);
            }
        }, 100);
    };
    const divide = () => {
        setScreen(" ");
        setSwitchedMemory(true);
        setCalcMethod(CalcMethod.DIVIDE);
        setTimeout(() => {
            if (memoryA) {
                setScreen(memoryA);
            }
        }, 100);
    };

    const del = () => {
        if (!switchedMemory) {
            if (!memoryA) return;

            const beforeVal = memoryA.slice(0, -1);
            setScreen(beforeVal);
            setMemoryA(beforeVal);
        } else {
            if (!memoryB) return;

            const beforeVal = memoryB.slice(0, -1);
            setScreen(beforeVal);
            setMemoryB(beforeVal);
        }
    };

    const setComma = () => {
        if (!switchedMemory) {
            if (!memoryA) {
                setScreen("0,");
                setMemoryA("0,");
            } else {
                setScreen(screen + ",");
                setMemoryA(memoryA + ",");
            }
        } else {
            if (!memoryB) {
                setScreen("0,");
                setMemoryB("o,");
            } else {
                setScreen(screen + ",");
                setMemoryB(memoryB + ",");
            }
        }
    };

    const reset = () => {
        setScreen("0");
        setMemoryA(null);
        setMemoryB(null);
        setSwitchedMemory(false);
        setCalcMethod(0);
    };

    const calculate = () => {
        if (!memoryA && !memoryB) return;

        switch (calcMethod) {
            case CalcMethod.ADD: {
                const num1 = parseFloat(memoryA!.replace(",", "."));
                const num2 = parseFloat(memoryB!.replace(",", "."));
                const result = num1 + num2;
                setScreen(result.toString().replace(".", ","));
                break;
            }

            case CalcMethod.MINUS: {
                const num1 = parseFloat(memoryA!.replace(",", "."));
                const num2 = parseFloat(memoryB!.replace(",", "."));
                const result = num1 - num2;
                setScreen(result.toString().replace(".", ","));
                break;
            }

            case CalcMethod.MULTIPLY: {
                const num1 = parseFloat(memoryA!.replace(",", "."));
                const num2 = parseFloat(memoryB!.replace(",", "."));
                const result = num1 * num2;
                setScreen(result.toString().replace(".", ","));
                break;
            }

            case CalcMethod.DIVIDE: {
                const num1 = parseFloat(memoryA!.replace(",", "."));
                const num2 = parseFloat(memoryB!.replace(",", "."));
                const result = num1 / num2;
                setScreen(result.toString().replace(".", ","));
                break;
            }

            default:
                break;
        }
    };

    const setNewTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (val === Themes.THEME1) {
            document.body.removeAttribute("class");
            document.body.classList.add("theme1");
        } else if (val === Themes.THEME2) {
            document.body.removeAttribute("class");
            document.body.classList.add("theme2");
        } else if (val === Themes.THEME3) {
            document.body.removeAttribute("class");
            document.body.classList.add("theme3");
        } else if (val === Themes.SYSTEM) {
            document.body.removeAttribute("class");
            document.body.classList.add("theme3");
        }

        setSelectedTheme(val);
    };

    return (
        <main className="calculator-app">
            <header className="header">
                <div className="header__logo">calc</div>
                <div className="header__theme-switch">
                    <div className="header__theme-switch_content">
                        <div className="header__theme-switch_title">Theme</div>
                        <div className="header__theme-switch_toggle">
                            <div className="header__theme-switch_toggle-numbers">
                                <ol className="header__theme-switch_toggle-numbers-list">
                                    <li>
                                        <span className="sr-only">Theme 1</span>
                                    </li>
                                    <li>
                                        <span className="sr-only">Theme 2</span>
                                    </li>
                                    <li>
                                        <span className="sr-only">System</span>
                                    </li>
                                </ol>
                            </div>
                            <div className="header__theme-switch_toggle-content">
                                <div className="switch-field">
                                    <input
                                        type="radio"
                                        id="theme-one"
                                        name="theme-one"
                                        value={Themes.THEME1}
                                        checked={
                                            selectedTheme === Themes.THEME1
                                        }
                                        onChange={setNewTheme}
                                    />
                                    <label htmlFor="theme-one">One</label>
                                    <input
                                        type="radio"
                                        id="theme-two"
                                        name="theme-two"
                                        value={Themes.THEME2}
                                        checked={
                                            selectedTheme === Themes.THEME2
                                        }
                                        onChange={setNewTheme}
                                    />
                                    <label htmlFor="theme-two">Two</label>
                                    <input
                                        type="radio"
                                        id="theme-three"
                                        name="theme-three"
                                        value={Themes.THEME3}
                                        checked={
                                            selectedTheme === Themes.THEME3
                                        }
                                        onChange={setNewTheme}
                                    />
                                    <label htmlFor="theme-three">Three</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="screen">
                <div className="screen__content">
                    <ReactFitty minSize={12} maxSize={46}>
                        {screen}
                    </ReactFitty>
                </div>
            </section>
            <section className="keypad">
                {/* Numbers */}
                <button
                    className="button button-1"
                    onClick={() => setNumber("1")}
                >
                    <span>1</span>
                </button>
                <button
                    className="button button-2"
                    onClick={() => setNumber("2")}
                >
                    <span>2</span>
                </button>
                <button
                    className="button button-3"
                    onClick={() => setNumber("3")}
                >
                    <span>3</span>
                </button>
                <button
                    className="button button-4"
                    onClick={() => setNumber("4")}
                >
                    <span>4</span>
                </button>
                <button
                    className="button button-5"
                    onClick={() => setNumber("5")}
                >
                    <span>5</span>
                </button>
                <button
                    className="button button-6"
                    onClick={() => setNumber("6")}
                >
                    <span>6</span>
                </button>
                <button
                    className="button button-7"
                    onClick={() => setNumber("7")}
                >
                    <span>7</span>
                </button>
                <button
                    className="button button-8"
                    onClick={() => setNumber("8")}
                >
                    <span>8</span>
                </button>
                <button
                    className="button button-9"
                    onClick={() => setNumber("9")}
                >
                    <span>9</span>
                </button>
                <button
                    className="button button-0"
                    onClick={() => setNumber("0")}
                >
                    <span>0</span>
                </button>

                {/* Functions */}
                <button className="button button-plus" onClick={add}>
                    <span>+</span>
                </button>
                <button className="button button-minus" onClick={minus}>
                    <span>-</span>
                </button>
                <button className="button button-multiply" onClick={multiply}>
                    <span>x</span>
                </button>
                <button className="button button-divide" onClick={divide}>
                    <span>/</span>
                </button>
                <button className="button button-del" onClick={del}>
                    <span>del</span>
                </button>
                <button className="button button-reset" onClick={reset}>
                    <span>reset</span>
                </button>

                {/* Comma */}
                <button className="button button-comma" onClick={setComma}>
                    <span>.</span>
                </button>

                {/* Caluclate */}
                <button className="button button-calculate" onClick={calculate}>
                    <span>=</span>
                </button>
            </section>
        </main>
    );
};

export default App;
