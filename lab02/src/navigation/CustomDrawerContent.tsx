import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import {DrawerContentComponentProps} from "@react-navigation/drawer";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const {navigation} = props;

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
            />

            <Text style={styles.name}>Андрій Ходаківський</Text>
            <Text style={styles.group}>Група: ІПЗ-24-2</Text>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("News")}>
                <Text style={styles.menuText}>Новини</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Contacts")}>
                <Text style={styles.menuText}>Контакти</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        backgroundColor: "#219a00",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold"
    },
    group: {
        fontSize: 14,
        color: "#666",
        marginBottom: 30
    },
    menuItem: {
        paddingVertical: 15
    },
    menuText: {
        fontSize: 16
    }
});