import * as React from 'react';
import { Text, View,  Image, useWindowDimensions} from 'react-native';

// StyleSheets
import globalStyles from "../styles/globalStyles";
import sliderItemStyle from "../styles/SliderItemStyles";

export default function DataCard({image, name}) {
  // Extraigo los estilos qu evoy a usar
  const { container } = globalStyles;
  const  { title, sliderImage, flexViewHalf, sliderItem } = sliderItemStyle;

 // Tomo datos del tamaño de la window
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

