import React from 'react'
import { StyleSheet, View, Image, Dimensions, PanResponder, Animated } from 'react-native'

export default class ImageZoomCarousel extends React.Component {
    constructor(props) {
        super(props)
        const { width, height } = Dimensions.get('window')
        this.imagesSizeData = {}
        this.nbImageSizeCalculated = 0
        this.state = {
            width,
            height,
            translate: new Animated.Value(0),
            page: 0,
            imagesData: {}
        }
        this.props.images.forEach(image => {
            this.state.imagesData[image] = {}
            Image.getSize(image, (width, height) => {
                this.imagesSizeData[image] = { width, height, ratio: width / height }
                this.nbImageSizeCalculated++
                if (this.nbImageSizeCalculated === this.props.images.length) {
                    this.setState({ imagesData: this.imagesSizeData })
                }
            })
        })
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: Animated.event([null, { dx: this.state.translate }]),
            onPanResponderRelease: this.endGesture.bind(this),
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('Terminate')
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true
        })
    }

    endGesture(evt, gestureState) {
        let toValue = 0
        if (
            Math.abs(gestureState.dx / this.state.width) > 0.2
            && !(
                !this.props.loop
                && ((gestureState.dx > 0 && this.state.page === 0)
                    || (gestureState.dx < 0 && this.state.page === this.props.images.length - 1))
            )
        ) {
            toValue = (gestureState.dx < 0) ? this.state.width * -1 : this.state.width
        }

        Animated.timing(
            this.state.translate,
            {
                toValue,
                duration: 300,
                useNativeDriver: true
            }
        ).start(() => {
            this.state.translate.setValue(0)
            if (toValue > 0) {
                this.prevPage()
            } else if (toValue < 0) {
                this.nextPage()
            }
        })
    }

    nextPage() {
        let page = this.state.page + 1
        if (page > this.props.images.length - 1) {
            page = !!this.props.loop ? 0 : this.props.images.length - 1
        }
        this.setState({
            page
        })
    }

    prevPage() {
        let page = this.state.page - 1
        if (page < 0) {
            page = !!this.props.loop ? this.props.images.length - 1 : 0
        }
        this.setState({
            page
        })
    }

    displayFirstLoopImage() {
        if (!!this.props.loop) {
            const image = this.props.images[this.props.images.length - 1]
            return (
                <Image source={{ uri: image }} style={this.getImageStyle(image)} />
            )
        }
    }

    displayLastLoopImage() {
        if (!!this.props.loop) {
            const image = this.props.images[0]
            return (
                <Image source={{ uri: image }} style={this.getImageStyle(image)} />
            )
        }
    }

    render() {
        return (
            <View style={styles.container} onLayout={this.onLayout.bind(this)}>
                <Animated.View {...this.panResponder.panHandlers} style={this.getSliderStyle()}>
                    {this.displayFirstLoopImage()}
                    {this.props.images.map((image, k) => {
                        return (
                            <Image key={k} source={{ uri: image }} style={this.getImageStyle(image)} />
                        )
                    })}
                    {this.displayLastLoopImage()}
                </Animated.View>
            </View>
        )
    }

    onLayout(evt) {
        const { width, height } = Dimensions.get('window')
        this.setState({ width, height })
    }

    getSliderStyle() {
        return {
            flexDirection: 'row',
            height: this.state.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#AAA',
            width: (this.props.images.length + (!!this.props.loop ? 2 : 0)) * this.state.width,
            left: (this.state.page + (!!this.props.loop ? 1 : 0)) * -1 * this.state.width,
            transform: [{
                translateX: this.state.translate
            }
            ]
        }
    }

    getImageStyle(image) {
        const windowRatio = this.state.width / this.state.height
        const ratio = this.state.imagesData[image].ratio
        let margin = 0
        let width, height

        if (ratio < 1 && ratio < windowRatio) {
            width = this.state.height * ratio
            height = this.state.height
            margin = (this.state.width - this.state.height * ratio) / 2
        } else {
            width = this.state.width
            height = this.state.width / ratio
        }
        return {
            width,
            height,
            marginLeft: margin,
            marginRight: margin
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});