import CalculatorButton from '@/components/CalculatorButton'
import ThemeText from '@/components/ThemeText'
import { buttonRows } from '@/constants/buttonRows'
import { globalStyles } from '@/styles/global-styles'
import React from 'react'
import { View } from 'react-native'

const CalculatorApp = () => {
    const handlePress = (value: string) => {
        console.log(value)
        // acá en el futuro podés manejar la lógica de cálculo
    }

    return (
        <View style={globalStyles.calculatorContainer}>

            {/* Resultados */}
            <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
                <ThemeText variant="h1">50 x 50</ThemeText>
                <ThemeText variant="h2">250</ThemeText>
            </View>

            {/* Botones */}
            {buttonRows.map((row, rowIndex) => (
                <View key={rowIndex} style={globalStyles.row}>
                    {row.map((btn, index) => (
                        <CalculatorButton
                            key={index}
                            label={btn.label}
                            color={btn.color}
                            blackText={btn.blackText}
                            doubleSize={btn.doubleSize}
                            onPress={() => handlePress(btn.label)}
                        />
                    ))}
                </View>
            ))}

        </View>
    )
}

export default CalculatorApp