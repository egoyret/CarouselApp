import React, {useState, useEffect, useRef} from 'react';
import {  View, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import DATA from '../data/data.js'
import DataCard from '../components/DataCard.js';
import ScrollButton from '../components/ScrollButton.js';

// StyleSheets
import sliderStyles from "../styles/SliderStyles";
import globalStyles from "../styles/globalStyles";

export default function Home() {
  // Extract styles to use
  const { container } = globalStyles;
  const { flexView } = sliderStyles;

  //const [datascr, setDatascr] = useState(DATA);
  const datascr = DATA ;

// Initial states of card index and cards
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

 // Function to move the carousel to the next card
 const ScrollToNext = async () => {
   // If there are one or more cards left to go, increment the current index by 1
   if (currentIndex < datascr.length - 3) {
       slidesRef.current.scrollToIndex({ index: currentIndex + 3 });
       setLastIndexToStorage(currentIndex + 3);
   }
   else
   {
    slidesRef.current.scrollToIndex({ index: datascr.length-1 });
    setLastIndexToStorage(datascr.length-1);
   }
   
 };

 // Function to move the carousel to the previous card
 const ScrollToPrevious = () => {
    // If there are one or more cards left to go back, decrement the current index by 1
    if (currentIndex > 2) {
        slidesRef.current.scrollToIndex({ index: currentIndex - 3 });
        setLastIndexToStorage(currentIndex - 3);
    }
    else
    {
      slidesRef.current.scrollToIndex({ index: 0 });
      setLastIndexToStorage(0);
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
      {/* Renderize carousel */}
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
         initialNumToRender={20}
         keyExtractor={item => item.title}
         onViewableItemsChanged={onViewableItemsChanged}
         ref={slidesRef}
         onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            slidesRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
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
              
            />
         {/* Scroll to next button */}
            <ScrollButton
              slidesLength={datascr.length}
              currentIndex={currentIndex}
              direction="next"
              scrollToNext={ScrollToNext}
              
            />
      </View>
    </View>
      
  );
}
