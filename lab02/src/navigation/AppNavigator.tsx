import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";
import ContactsScreen from "../screens/ContactsScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerContent={(props) => <CustomDrawerContent {...props}/>}
            >
                <Drawer.Screen
                    name="News"
                    component={StackNavigator}
                />

                <Drawer.Screen
                    name="Contacts"
                    component={ContactsScreen}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}