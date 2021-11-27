import React, {useState, useContext, useEffect} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [disabled, setDisabled] = useState(false)

  const { state, signup, clearErrorMessage} = useContext(
    AuthContext
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage()
    });

    return unsubscribe;
  }, [navigation]);



  const unsubscribe = navigation.addListener('tabPress', () => {
    // Prevent default action
    errorMessage();
  });

  const check = () => {
    if(email || password || firstName || lastName === ''){
      setDisabled(false)
    } 
  }

  return(
    <View style={styles.container2}>
      <ScrollView style={styles.container}>
        <Title style={{alignSelf: 'center', fontSize: 25}}>Sign up for Fitlance</Title>
        <Ionicons name="fitness" size={75} color="red" style={{alignSelf: 'center'}}/>
        {/* <Text style={styles.textStyle}>Enter First Name: </Text> */}
        <TextInput 
          style={{margin: 10}} 
          value={firstName} 
          onChangeText={setFirstName}
          left={<TextInput.Icon name={() => <Ionicons name="person-outline" size={25} />} />}
            label={'First Name'}
            mode='outlined'
          theme={{
            roundness: 20,
            colors: {
              primary:'#30bfbf',
              underlineColor:'transparent',
            }
          }}
        />
        {/* <Text style={styles.textStyle}>Enter Last Name:</Text> */}
          <TextInput 
            style={{margin: 10}} 
            value={lastName} 
            onChangeText={setLastName}
            left={<TextInput.Icon name={() => <Ionicons name="person-outline" size={25} />} />}
            label={'Last Name'}
            mode='outlined'
            theme={{
              roundness: 20,
              colors: {
                primary:'#30bfbf',
                underlineColor:'transparent',
              }
            }}
          />
          {/* <Text style={styles.textStyle}>Enter Email: </Text> */}
          <TextInput 
            style={{ margin: 10}} 
            value={email} 
            onChangeText={setEmail}  
            keyboardType="email-address"
            left={<TextInput.Icon name={() => <Ionicons name="mail-outline" size={25} />} />}
            label={'Email'}
            mode='outlined'
            theme={{
              roundness: 20,
              colors: {
                primary:'#30bfbf',
                underlineColor:'transparent',
              }
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* <Text style={styles.textStyle}>Enter Password: </Text> */}
          <TextInput 
            style={{ margin: 10}} 
            secureTextEntry value={password} 
            onChangeText={setPassword} 
            left={<TextInput.Icon name={() => <Ionicons name="key-outline" size={25} />} />}
            label={'Password'}
            mode='outlined'
            theme={{
              roundness: 20,
              colors: {
                primary:'#30bfbf',
                underlineColor:'transparent',
              }
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}
        <Button dark={true} disabled={disabled} mode="contained" color={"#30bfbf"} onPress={() => signup({ firstName, lastName, email, password})}>Create</Button>
        <Button mode='text' onPress={() => navigation.navigate("Signin")}>Have an account? Sign in instead</Button>
      </ScrollView>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    marginTop: 50
    
  
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10
  }, 
  inputStyle: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin:15,
    width:300,
    borderRadius: 20,
    flexDirection: 'row'
  },
  textStyle: {
    marginTop: 15,
    marginLeft: 10
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10
  }
});
 
export default SignupScreen

