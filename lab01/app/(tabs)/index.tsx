import {StyleSheet, View, Text, ScrollView} from 'react-native'
import {NewsCard} from "../../components/NewsCard";
import news from '@/data/news.json';

export default function HomeScreen() {
    return (
        <View>
            <Text style={styles.h1}>Новини</Text>
            <ScrollView>
                {news.map(item => (
                    <NewsCard
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        text={item.text}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontSize: 32,
        paddingTop: 16,
    },

    newsContainer: {
        display: "flex",
        flexDirection: "column",
    }
});

