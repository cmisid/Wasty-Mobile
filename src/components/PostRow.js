import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import ProgressiveImage from './ProgressiveImage'

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import frLocale from 'date-fns/locale/fr'

import AppText from './AppText'
import Card from './card/Card'
import { colors } from '../style'

export default class ItemRow extends Component {
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPressAction}>
        <View style={{flex: 1}}>
          <Card>
            <View>
              <Icon
                name={this.props.item.pickedUp ? 'check' : ''}
                iconStyle={{textAlign: 'center'}}
                size={20}
                color='green'
                style={{textAlign: 'center'}}
              />
              <View
                style={styles.row}
              >
                <ProgressiveImage
                  thumbnailSource={{ uri: this.props.item.imgPlaceholderUrl }}
                  imageSource={{ uri: this.props.item.imgUrl }}
                  style={styles.image}
                />
                <View
                  style={{flex: 2, marginLeft: 5}}
                >
                  <AppText
                    style={StyleSheet.flatten(styles.title)}
                  >
                    {this.props.item.title} publié {distanceInWordsToNow(
                        this.props.item.publishDate,
                        {locale: frLocale, addSuffix: true}
                      )}
                  </AppText>
                  <AppText
                    style={StyleSheet.flatten(styles.category)}
                  >
                    {this.props.item.category}
                  </AppText>
                  <View
                    style={styles.content}
                  >
                    <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 200, marginBottom: 8}}>
                      <Icon
                        name='star'
                        iconStyle={{marginTop: 10}}
                        size={20}
                        color='gold'
                      />
                      <AppText> {this.props.item.nLikes}</AppText>
                    </View>
                  </View>
                  <View
                    style={styles.content}
                  >
                    <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 200, marginBottom: 5}}>
                      <Icon name='remove-red-eye' iconStyle={{marginTop: 10}} size={20} color={colors.secondary} />
                      <AppText> {this.props.item.nViews}</AppText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </TouchableHighlight>
    )
  }
}

ItemRow.propTypes = {
  item: React.PropTypes.object,
  onPressAction: React.PropTypes.func,
  userLat: React.PropTypes.number,
  userLon: React.PropTypes.number
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  category: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  },
  image: {
    width: 100 - 10,
    height: 100 - 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  title: {
    marginLeft: 10,
    marginTop: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10
  },
  streetName: {
    color: colors.link
  },
  distance: {
    fontStyle: 'italic',
    color: colors.background,
    marginRight: 5
  },
  recup: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
    opacity: 0.2
  }
})
