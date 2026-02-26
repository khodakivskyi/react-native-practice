import {ReactNode} from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import TabsMenu from "../../components/TabsMenu";

type Props = { children: ReactNode };

export default function TabsLayout({children}: Props) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Lab 01</Text>
                </View>
            </SafeAreaView>

            {/* Menu */}
            <TabsMenu />

            {/* Content */}
            <View>{children}</View>

            {/* Footer */}
            <SafeAreaView style={styles.footerSafe}>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        © 2026 khodakivskyi
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#000000',
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
    },
    menuButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    menuButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footerSafe: {
        backgroundColor: '#000',
    },
    footer: {
        backgroundColor: '#000',
        paddingVertical: 8,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
});