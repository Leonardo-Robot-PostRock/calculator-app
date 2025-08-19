import { useRef, useState } from "react";

enum Operator {
    add = "+",
    subtract = "-",
    multiply = "x",
    divide = "÷"
}

export const useCalculator = () => {
    const [formula, setFormula] = useState("");
    const [number, setNumber] = useState("0");
    const [prevNumber, setPrevNumber] = useState("");
    const lastOperation = useRef<Operator>(undefined);
    const lastButton = useRef<string>("");
    const openParenthesesCount = useRef(0);
    const lastResult = useRef(""); // Para almacenar el último resultado

    const buildNumber = (numStr: string) => {
        // Si el último botón fue "equals", reiniciar para nueva operación
        if (lastButton.current === "equals") {
            setFormula(numStr === '.' ? '0.' : numStr);
            setNumber(numStr === '.' ? '0.' : numStr);
            lastButton.current = "number";
            return;
        }

        // No permitir múltiples puntos decimales en el mismo número
        if (numStr === '.' && number.includes('.')) return;

        // Si el último botón fue un operador o paréntesis, comenzar nuevo número
        if (lastButton.current === "operator" || lastButton.current === "parenthesis") {
            setNumber(numStr === '.' ? '0.' : numStr);
            setFormula(formula + (numStr === '.' ? '0.' : numStr));
        } else {
            // Evitar múltiples ceros a la izquierda
            if (number === "0" && numStr !== ".") {
                setNumber(numStr);
                setFormula(formula.slice(0, -1) + numStr);
            } else {
                setNumber(number + numStr);
                setFormula(formula + numStr);
            }
        }

        lastButton.current = "number";
    };

    const setOperation = (operator: Operator) => {
        if (number === "Error") return;

        // Si el último botón fue "equals", usar el resultado como base
        if (lastButton.current === "equals") {
            setFormula(lastResult.current + ` ${operator} `);
            setNumber("");
            setPrevNumber(lastResult.current);
            lastOperation.current = operator;
            lastButton.current = "operator";
            return;
        }

        // Si el último botón fue un operador, reemplazarlo
        if (lastButton.current === "operator") {
            setFormula(formula.slice(0, -2) + ` ${operator} `);
        } else {
            setFormula(`${formula} ${operator} `);
            setPrevNumber(number);
        }

        setNumber("");
        lastOperation.current = operator;
        lastButton.current = "operator";
    };

    const calculateResult = () => {
        if (formula === "" || lastButton.current === "equals") return;

        try {
            // Preparar expresión para evaluación
            let expression = formula;

            // Reemplazar operadores para evaluación
            expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

            // Función de evaluación segura
            const result = safeEvaluate(expression);

            // Almacenar el resultado para uso futuro
            lastResult.current = result.toString();

            // Solo mostrar el resultado, sin el signo igual
            setFormula(result.toString());
            setNumber(result.toString());
            setPrevNumber("");
            lastOperation.current = undefined;
            lastButton.current = "equals";
        } catch (error) {
            setNumber("Error");
            setFormula("Error en el cálculo");
            lastButton.current = "equals";
        }
    };

    // Evaluación segura de expresiones matemáticas
    const safeEvaluate = (expression: string): number => {
        // Eliminar espacios
        expression = expression.replace(/\s/g, '');

        // Validar paréntesis balanceados
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;

        if (openCount !== closeCount) {
            throw new Error("Paréntesis no balanceados");
        }

        // Evaluar usando Function
        try {
            return Function(`"use strict"; return (${expression})`)();
        } catch {
            throw new Error("Expresión inválida");
        }
    };

    const handleParenthesis = () => {
        // Si el último botón fue "equals", reiniciar
        if (lastButton.current === "equals") {
            clean();
        }

        const openCount = (formula.match(/\(/g) || []).length;
        const closeCount = (formula.match(/\)/g) || []).length;

        // Determinar si abrir o cerrar paréntesis
        if (openCount <= closeCount ||
            formula.endsWith("(") ||
            formula === "" ||
            lastButton.current === "operator") {
            // Abrir paréntesis
            setFormula(formula + "(");
            openParenthesesCount.current++;
        } else {
            // Cerrar paréntesis
            setFormula(formula + ")");
            openParenthesesCount.current--;
        }

        setNumber("");
        lastButton.current = "parenthesis";
    };

    const clean = () => {
        setFormula("");
        setNumber("0");
        setPrevNumber("");
        lastOperation.current = undefined;
        lastButton.current = "";
        openParenthesesCount.current = 0;
        lastResult.current = "";
    };

    const toggleSign = () => {
        if (number === "0" || number === "") return;

        if (number.startsWith('-')) {
            const newNumber = number.substring(1);
            setNumber(newNumber);

            // Actualizar la fórmula
            if (lastButton.current === "equals") {
                setFormula(newNumber);
                lastResult.current = newNumber;
            } else {
                const parts = formula.split(' ');
                parts[parts.length - 1] = newNumber;
                setFormula(parts.join(' '));
            }
        } else {
            const newNumber = '-' + number;
            setNumber(newNumber);

            // Actualizar la fórmula
            if (lastButton.current === "equals") {
                setFormula(newNumber);
                lastResult.current = newNumber;
            } else {
                const parts = formula.split(' ');
                parts[parts.length - 1] = newNumber;
                setFormula(parts.join(' '));
            }
        }
    };

    const deleteLast = () => {
        if (lastButton.current === "equals") {
            clean();
            return;
        }

        if (number.length === 1) {
            setNumber("0");
            setFormula(formula.slice(0, -1));
            return;
        }

        setNumber(number.slice(0, -1));
        setFormula(formula.slice(0, -1));
    };

    return {
        formula,
        number,
        prevNumber,

        
        buildNumber,
        setOperation,
        calculateResult,
        clean,
        toggleSign,
        deleteLast,
        handleParenthesis
    };
};