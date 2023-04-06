import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Switch } from 'react-native';
import Button from '../components/Button';

const LightTheme = {
  backgroundColor: '#d3a357',
  keyBoardColor: '#fefefe',
  textColor: '#281b08',
  tapColor: '#778899',
  switchColor: '#615c54',
}
const DarkTheme = {
  backgroundColor: '#875810',
  keyBoardColor: '#54380b',
  textColor: '#f0edea',
  tapColor: '#778899',
  switchColor:'#f4e9db'
}

function MainScreen(props) {
  const [value1, setValue1] = useState('')
  const [oper, setOper] = useState('')
  const [hasOper, setHasOper] = useState(false)
  const [value2, setValue2] = useState('')
  const [clickEqual, setClickEqual] = useState(false)
  const [isDarkMode, setDarkMode] = useState(false)
  const theme = !isDarkMode ? LightTheme : DarkTheme

  const toggleTheme = () => setDarkMode(isDarkMode => !isDarkMode)

  const clickNumber = (value) => {
    // check if we clicked oper or not
    // if (not)
    if (!hasOper)
    {
      // if the clicked button before is = button or the current val1 is NaN, start new computation with the new clicked value
      if (clickEqual || value1 === 'NaN')
      {
        setValue1(value)
        setClickEqual(false)
      }
      else{ // else concatenate current value1 to the clicked value
        setValue1(value1 + value)
      }
      
    }
    // if we clicked operator and then clicked number
    // set the clicked number to value 2
    else{
      setValue2(value2 + value)
    }
  }
  const clickOper = (op) => {
        // first time click oper
        if (!hasOper)
        {
            // set oper
            setOper(op)
            // set hasOper to true
            setHasOper(true)
        }
        // click oper after clicking oper and some number
        else if (hasOper && value2)
        {
            // in this stage, we assume we already had value1, value2, oper ready
            // comnpute previous operation and then set oper to new oper
            const operation = value1 + oper + value2;
            setValue1(eval(operation).toString());
            // reset value2 
            setValue2('')
            // set oper to new oper we just clicked
            setOper(op)
      
      
        }
        // click oper after clicking another oper
        else {
          //dismiss old oper and set to the new one
          setOper(op)
  
        }
  }
  
  
  const clickSpecialOper = (op) => {
  if (op === '%')
  {
      // if this op is for value1
      //if this op is for value2
      if (value2)
      {
        setValue2((parseInt(value2) / 100).toString())
      }
      else if (value1)
      {
        setValue1((parseInt(value1) / 100).toString())
      }
  }
  else if (op === 'neg')
  {
        if (value2)
        {
          setValue2((parseInt(value2) * -1).toString())
        }
        else if (value1)
        {
          setValue1((parseInt(value1) * -1).toString())
       }
  }
  
  
  }
  
  const compute = () => {
  setClickEqual(true)
  // click = after having val1, op, val2 ready to perform operation
  if (hasOper && value1 && value2)
  {
    const operation = value1 + oper + value2;
    setValue1(eval(operation).toString());
    // reset value2 
    setValue2('')
    // set oper to new oper we just clicked
    setOper('')
    setHasOper(false)
  }
  // click = when just having val1, and op
  else if (hasOper && value1)
  {
    const operation = value1 + oper + value1
    setValue1(eval(operation).toString());
    setOper('')
    setHasOper(false)
  }
  //click = when just having val1
  else
    setValue1(value1)
    
  }
  
  const reset = () => {
  setValue1('')
  setValue2('')
  setOper('')
  setHasOper(false)
  setClickEqual(false)
  }
  


  
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: theme.backgroundColor, width: "100%", height: "40%"}}>
        
        <View style={{width: "100%", alignItems:'flex-end',top: Dimensions.get('screen').height - 630, position:'absolute', paddingRight:10}}>
            <Text style={{fontSize: 62, 
                    fontWeight: '600', color: '#f2ece3'}}>
                      {value2 ? value2 : (value1 ? value1 :  0)}
              </Text>
        </View>

        {/* Switch */}
        <Switch style={{position: 'absolute', top: 40, left: 20}} value={isDarkMode} thumbColor={theme.switchColor} trackColor={{false: theme.backgroundColor, true: theme.backgroundColor}} onValueChange={toggleTheme}/>

      </SafeAreaView>

        



      {/* Keyboard */}
    <View style={{height: '100%'}}> 
      {/* first row */}
      <View style={{flexDirection:'row'}}>
          <Button text={'AC'} onPress={reset} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'+-'} onPress={() => clickSpecialOper('neg')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'%'} onPress={() => clickSpecialOper('%')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'/'} onPress={() => clickOper('/')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
      </View>

      {/* second row */}
      <View style={{flexDirection:'row'}}>
          <Button text={'7'} onPress={() => clickNumber('7')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'8'} onPress={() => clickNumber('8')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'9'} onPress={() => clickNumber('9')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'X'} onPress={() => clickOper('*')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
      </View>

      {/* third row */}
      <View style={{flexDirection:'row'}}>
          <Button text={'4'} onPress={() => clickNumber('4')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'5'} onPress={() => clickNumber('5')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'6'} onPress={() => clickNumber('6')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'-'} onPress={() => clickOper('-')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
      </View>

      {/* fourth row */}
      <View style={{flexDirection:'row'}}>
          <Button text={'1'} onPress={() => clickNumber('1')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'2'} onPress={() => clickNumber('2')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'3'} onPress={() => clickNumber('3')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
          <Button text={'+'} onPress={() => clickOper('+')} styleContainer={{backgroundColor: theme.keyBoardColor}} textStyle={{color: theme.textColor}}></Button>
      </View>

      {/* fifth row */}
      <View style={{flexDirection:'row'}}> 
          <Button text={'0'} styleContainer={{width: 220, height: 120,backgroundColor: theme.keyBoardColor}} onPress={() => clickNumber('0')} textStyle={{color: theme.textColor}}></Button>
          <Button text={'.'} styleContainer={{height: 120, backgroundColor: theme.keyBoardColor}} onPress={() => clickNumber('.')} textStyle={{color: theme.textColor}}></Button>
          <Button text={'='} styleContainer={{height: 120, backgroundColor: theme.backgroundColor}} onPress={compute} textStyle={{color: '#f2ece3'}} ></Button>
          
      </View>
      
    </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

export default MainScreen;