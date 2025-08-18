import CalculatorButton from '@/components/CalculatorButton'
import ThemeText from '@/components/ThemeText'
import { Colors } from '@/constants/Colors'
import { globalStyles } from '@/styles/global-styles'
import React from 'react'
import { View } from 'react-native'

const CalculatorApp = () => {
    return (
        <View style={globalStyles.calculatorContainer}>
            {/* Resultados */}
            <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
                <ThemeText variant='h1'>50 x 50</ThemeText>
                <ThemeText variant='h2'>250</ThemeText>
            </View>

            {/* Fila de botones */}
            <View style={globalStyles.row}>
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('C')} label='C' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('+/-')} label='+/-' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('del')} label='del' />
                <CalculatorButton color={Colors.orange} onPress={() => console.log('÷')} label='÷' />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('7')} label='7' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('8')} label='8' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('9')} label='9' />
                <CalculatorButton color={Colors.orange} onPress={() => console.log('x')} label='x' />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('4')} label='4' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('5')} label='5' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('6')} label='6' />
                <CalculatorButton color={Colors.orange} onPress={() => console.log('-')} label='-' />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('1')} label='1' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('2')} label='2' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('3')} label='3' />
                <CalculatorButton color={Colors.orange} onPress={() => console.log('-')} label='+' />
            </View>

            <View style={globalStyles.row}>
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('0')} doubleSize label='0' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('.')} label='.' />
                <CalculatorButton color={Colors.lightGray} blackText onPress={() => console.log('=')} label='=' />
            </View>

        </View>
    )
}

export default CalculatorApp