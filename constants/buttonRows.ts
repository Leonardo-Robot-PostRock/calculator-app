import { ButtonConfig } from "@/types/types";
import { Colors } from "./Colors";

export const buttonRows: ButtonConfig[][] = [
    [
        { label: 'C', color: Colors.lightGray, blackText: true },
        { label: '+/-', color: Colors.lightGray, blackText: true },
        { label: 'del', color: Colors.lightGray, blackText: true },
        { label: '÷', color: Colors.orange },
    ],
    [
        { label: '7', color: Colors.lightGray, blackText: true },
        { label: '8', color: Colors.lightGray, blackText: true },
        { label: '9', color: Colors.lightGray, blackText: true },
        { label: 'x', color: Colors.orange },
    ],
    [
        { label: '4', color: Colors.lightGray, blackText: true },
        { label: '5', color: Colors.lightGray, blackText: true },
        { label: '6', color: Colors.lightGray, blackText: true },
        { label: '-', color: Colors.orange },
    ],
    [
        { label: '1', color: Colors.lightGray, blackText: true },
        { label: '2', color: Colors.lightGray, blackText: true },
        { label: '3', color: Colors.lightGray, blackText: true },
        { label: '+', color: Colors.orange },
    ],
    [
        { label: '0', color: Colors.lightGray, blackText: true, doubleSize: true },
        { label: '.', color: Colors.lightGray, blackText: true },
        { label: '=', color: Colors.lightGray, blackText: true },
    ],
]