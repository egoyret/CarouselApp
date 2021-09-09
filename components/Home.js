import React, {useState, useEffect, useRef} from 'react';

import { ScrollView, Text,  View, Image, StyleSheet, FlatList, Button, Alert } from 'react-native';

import DATA from '../data/data.js'
import DataCard from '../components/DataCard.js';
import ScrollButton from '../components/ScrollButton.js';

// StyleSheets
import sliderStyles from "../styles/SliderStyles";
import globalStyles from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
  // Extraer los estilos que se van a usar
  const { container } = globalStyles;
  const { flexView } = sliderStyles;

const cant = 3;  
//const [current, setCurrent] = useState(0);
var current = 0
//var end = current + cant;
var end = DATA.length;
const [datascr, setDatascr] = useState(DATA.slice(current, end));
console.log('datascr: ',datascr);
 function nextslide(){
   end = current + cant + cant;
   current = current + cant;
  // setCurrent(current + cant);
   setDatascr(DATA.slice(current,end))
console.log('current: ', current, end);
 }

// Initial states of slide index and slides
const [currentIndex, setCurrentIndex] = useState(0)
const [value, setValue] = useState("");

// Refs
const slidesRef = useRef(null)
const onViewableItemsChanged = useRef(({ viewableItems }) => {
            // If items change change the current index of the slides
            setCurrentIndex(viewableItems[0].index);
        }).current;

// Sets the index to AsyncStorage
const setLastIndexToStorage = async (index) => {
  if (currentIndex >= 0) {
      try {
          await AsyncStorage.setItem(
              "@lastViewedIndex",
              index.toString()
          );
      } catch {
          alert("Some error occurred!!");
      }
  }
};

 // Function to move the slider to the next slide
 const ScrollToNext = async () => {
   // If there are one or more slides left to go, increment the current index by 1
   if (currentIndex < datascr.length - 1) {
       slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
   }
   if (currentIndex >= 0) {
       setLastIndexToStorage(currentIndex + 1);
   }
 };

 // Function to move the slider to the previous slide
 const ScrollToPrevious = () => {
    // If there are one or more slides left to go back, decrement the current index by 1
    if (currentIndex > 0) {
        slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
    if (currentIndex >= 0) {
        setLastIndexToStorage(currentIndex - 1);
    }
 };

// Get the index that was lastly viewed the last time the app closed
useEffect(() => {
 (async () => {
     try {
         const lastViewedIndex = await AsyncStorage.getItem(
             "@lastViewedIndex"
         );

         // If the last viewed index was set
         if (lastViewedIndex) {
             setValue(lastViewedIndex);
         }
     } catch (err) {
         alert("Some error occurred!!");
     }
 })();
}, []);

  return (
    <View style={container}>
      <View style={flexView}>
      {/* Renderiza el carrousel */}
        <FlatList
         data={datascr}
         renderItem={({item, index}) => 
          <DataCard 
           key={index}
           image={item.imageUrl} 
           name={item.title}/>
         }
         horizontal
         initialScrollIndex={parseInt(value)}
         keyExtractor={item => item.title}
         onViewableItemsChanged={onViewableItemsChanged}
         ref={slidesRef}
        />
      </View>
      {/* Scroll Buttons */}
      <View
       style={[container, { flexDirection: "row", flexWrap: "wrap" }, ]} >
         {/* Scroll to previous button */}
            <ScrollButton
              currentIndex={currentIndex}
              direction="previous"
              scrollToPrevious={ScrollToPrevious}
              percentage={(currentIndex + 1) * (100 / datascr.length)}
            />
         {/* Scroll to next button */}
            <ScrollButton
              slidesLength={datascr.length}
              currentIndex={currentIndex}
              direction="next"
              scrollToNext={ScrollToNext}
              percentage={(currentIndex + 1) * (100 / datascr.length)}
            />
      </View>



    </View>
     
   
  );
}

{/* <View  style={styles.container}>
<Image style={styles.image} source={{uri: item.imageUrl}} />
<Text style={styles.font}>{item.title}</Text>
</View>
 */}


//{ data.map((item, index) => {
//  <DataCard 
//   id={index}
//   image={item.imageUrl} 
//   name={item.title} />
//})
//}



{/* <ScrollView>
{data.map((item, index) => {
  <View key={index}>
      <Image style={styles.image} source={{uri: item.imageUrl}}/>
      <Text style={styles.font}>{item.title}</Text>
  </View> 
})
}
</ScrollView>    */}

