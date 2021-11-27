import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CameraScreen from '../screens/CameraScreen'
import SignInScreen from '../screens/SignInScreen'
import { navigatorRef } from '../navigationRef'

const Stack = createNativeStackNavigator()

export default function Navigator() {
    return(
        <SignInScreen />
    )
}

