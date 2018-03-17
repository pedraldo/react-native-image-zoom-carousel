import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ImageZoomCarousel from './components/ImageZoomCarousel'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      images: [
        'https://placemat.imgix.net/placeholder_images/images/000/000/003/original/photo-1433832597046-4f10e10ac764?ixlib=rb-1.0.0&w=&h=&fm=auto&crop=faces%2Centropy&fit=crop&txt=&txtclr=BFFF&txtalign=middle%2Ccenter&txtfit=max&txtsize=42&txtfont=Avenir+Next+Demi%2CBold&bm=multiply&blend=ACACAC&s=27df945bf5a2328a4223594f38ac9abf',
        'https://placemat.imgix.net/placeholder_images/images/000/000/043/original/photo-1428604422807-314cf752cbc9?ixlib=rb-1.0.0&w=&h=&fm=auto&crop=faces%2Centropy&fit=crop&txt=&txtclr=BFFF&txtalign=middle%2Ccenter&txtfit=max&txtsize=42&txtfont=Avenir+Next+Demi%2CBold&bm=multiply&blend=ACACAC&s=962f319e5c6b3826b17f7554ccbf1c4b',
        'https://placemat.imgix.net/placeholder_images/images/000/000/068/original/c86b8baa?ixlib=rb-1.0.0&w=&h=&fm=auto&crop=faces%2Centropy&fit=crop&txt=&txtclr=BFFF&txtalign=middle%2Ccenter&txtfit=max&txtsize=42&txtfont=Avenir+Next+Demi%2CBold&bm=multiply&blend=ACACAC&s=cb5d6aa1f412cad788d71f193966022c'
      ]
    }
  }
  render() {
    return (
      <ImageZoomCarousel 
        images={this.state.images}
        loop={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
