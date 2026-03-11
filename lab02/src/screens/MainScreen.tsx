import {View, Text, FlatList} from "react-native";
import {newsData} from "../data/mockData";
import {News} from '../types/News';
import {useState} from "react";

export default function MainScreen() {
    const [data, setData] = useState(newsData);
    const [refreshing, setRefreshing] = useState(false);

    const renderItem = ({item}: {item: News}) => {
        return(
            <View style={{padding: 16}}>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        );
    }

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(()=>{
            setData(newsData);
            setRefreshing(false)
        }, 1000);
    }

    const loadMore = () => {
        const moreNews = newsData.map((item, i) => ({
            ...item,
            id: item.id + "_more_" + i
        }))

        setData(prev=> [...prev, ...moreNews])
    }

    return (

        <FlatList data={data} keyExtractor={(item) => item.id}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                  initialNumToRender={6}
                  maxToRenderPerBatch={6}
                  windowSize={6}
                  renderItem={renderItem}

                  ItemSeparatorComponent={() => (
                      <View style={{height:1, backgroundColor:"#ddd"}} />
                  )}

                  ListHeaderComponent={
                      <Text style={{fontSize:22, padding:16}}>
                          News
                      </Text>
                  }

                  ListFooterComponent={
                      <Text style={{textAlign:"center", padding:20}}>
                          Loading more...
                      </Text>
                  }
        />
    )
}