import * as React from 'react';
import { Text, View,  Image, useWindowDimensions} from 'react-native';

// StyleSheets
import globalStyles from "../styles/globalStyles";
import sliderItemStyle from "../styles/SliderItemStyles";

export default function DataCard({image, name}) {
  // Extract styles to use
  const { container } = globalStyles;
  const  { title, sliderImage, flexViewHalf, sliderItem } = sliderItemStyle;

 // Adjust width to size of window
 const { width } = useWindowDimensions();
  return (
   
   <View style={[container, sliderItem, { width }]}>
     <Image style={[sliderImage, { width }]}
       source={{uri: image}}/>
     <View style={flexViewHalf}>
       <Text style={title}>{name}</Text>
     </View>
   </View>

);
}

