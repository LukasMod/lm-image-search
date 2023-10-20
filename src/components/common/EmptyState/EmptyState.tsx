import { Image } from "expo-image"
import { Text } from "../Text/Text"
import { View } from "react-native"
import styles from "./styles"

const sadFace = require("../../../../assets/images/sad-face.png")

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Image source={sadFace} style={styles.image} contentFit="contain" />
      <Text
        text="We know it's sad, but there is no results. Sorry!"
        style={styles.text}
        preset="header"
      />
    </View>
  )
}

