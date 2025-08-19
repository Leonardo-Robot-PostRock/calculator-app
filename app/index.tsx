import CalculatorButton from '@/components/CalculatorButton'
import ThemeText from '@/components/ThemeText'
import { buttonRows } from '@/constants/buttonRows'
import { useCalculator } from '@/hooks/useCalculator'
import { globalStyles } from '@/styles/global-styles'
import { ButtonConfig } from '@/types/types'
import React from 'react'
import { View } from 'react-native'

const CalculatorApp = () => {
    const { 
        formula, 
        number, 
        buildNumber, 
        clean, 
        toggleSign, 
        deleteLast, 
        handleParenthesis,
        setOperation,
        calculateResult
    } = useCalculator()

    const handlePress = (btn: ButtonConfig) => {
        switch (btn.label) {
            case 'C':
                clean()
                break
            case '+/-':
                toggleSign()
                break
            case 'del':
                deleteLast()
                break
            case '()':
                handleParenthesis()
                break
            case '=':
                calculateResult()
                break
            case '÷':
                setOperation('÷' as any)
                break
            case 'x':
                setOperation('x' as any)
                break
            case '-':
                setOperation('-' as any)
                break
            case '+':
                setOperation('+' as any)
                break
            default:
                buildNumber(btn.label)
        }
    }

    const renderButton = (btn: ButtonConfig, index: number) => (
        <CalculatorButton
            key={index}
            label={btn.label}
            color={btn.color}
            blackText={btn.blackText}
            onPress={() => handlePress(btn)}
        />
    )

    return (
        <View style={globalStyles.calculatorContainer}>
            {/* Resultados */}
            <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
                <ThemeText variant="h1">{formula}</ThemeText>
                <ThemeText variant="h2">{number}</ThemeText>
            </View>

            {/* Botones */}
            {buttonRows.map((row, rowIndex) => (
                <View key={rowIndex} style={globalStyles.row}>
                    {row.map((btn, index) => (
                        renderButton(btn, index)
                    ))}
                </View>
            ))}
        </View>
    )
}

export default CalculatorApp