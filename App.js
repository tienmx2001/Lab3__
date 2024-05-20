import React,{useEffect} from "react";
import { StyleSheet,Text,View } from "react-native";
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContextControllerProvider } from "./store";
import Router from "./screens/Router"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import COLORS from "./constants"
import RouterServices from "./screens/RouterServices";

const Stack = createNativeStackNavigator();
const initial = ()=>{
  const USERS = firestore().collection("USERS")
  const admin = {
    name:"admin",
    phone:"0911111111",
    address:"Binh Duong",
    email:"2024802010133@student.tdmu.edu.vn",
    password:"123456",
    role:"admin"
  }
  USERS.doc(admin.email)
  .onSnapshot(u=> {
    if(!u.exists)
      {
        auth().createUserWithEmailAndPassword(admin.email,admin.password)
        .then(()=>
          USERS.doc(admin.email).set(admin)
        .then(()=> console.log("Add new user admin! ")
    
          )
        )
      }
  })
}
export default App = ()=> {
  useEffect(()=>{
    initial()
  },[])
  return(
    <PaperProvider>
    {/* <StatusBar backgroundColor={COLORS.pink} /> */}
    <MyContextControllerProvider>
      <NavigationContainer>
       <Router>
       </Router>
      </NavigationContainer>
    </MyContextControllerProvider>
  </PaperProvider>
  )
}

const styles = StyleSheet.create(
  {
    container:{

    }
  }
)