import React, {Component} from 'react'

import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native'

import { Actions } from 'react-native-router-flux'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'
import ProgressiveImage from './ProgressiveImage'

import Card from './card/Card'
import CardHeader from './card/CardHeader'
import CardFooter from './card/CardFooter'

// Google Maps
const generateMapLink = (sourceLat, sourceLon, destLat, destLon) => (
  `http://maps.google.com/maps?saddr=${sourceLat},${sourceLon}&daddr=${destLat},${destLon}`
)

const toRad = x => x * Math.PI / 180

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

  return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const distanceFmt = dist => dist < 1 ? `${Math.round((dist * 1000).toFixed(2), 1)} m` : `${Math.round(dist.toFixed(2), 1)} km`

export default class ItemCard extends Component {
  // TODO: add TouchableOpacity parent
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPressAction}>
        <View style={{flex: 1}}>
          <Card>

            <CardHeader
              title={this.props.item.title}
              category={this.props.item.category}
            />

            <ProgressiveImage
              thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
              imageSource={{ uri: this.props.item.imgUrl }}
              style={styles.image}
            />

            <CardFooter
              publishDate={distanceInWordsToNow(
                this.props.item.publishDate,
                {locale: frLocale, addSuffix: true}
              )}
              streetName={this.props.item.streetName}
              cityName={this.props.item.cityName}
              userImg={this.props.item.publisher.imgUrl}
              username={`${this.props.item.publisher.firstName} ${this.props.item.publisher.lastName}`}
              distance={distanceFmt(haversineDistance(
                this.props.userLat,
                this.props.userLon,
                this.props.item.lat,
                this.props.item.lon
              ))}
              mapUrl={generateMapLink(
                this.props.userLat,
                this.props.userLon,
                this.props.item.lat,
                this.props.item.lon
              )}
              views={this.props.item.nViews}
            />
          </Card>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 2 - 10,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

ItemCard.propTypes = {
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}
