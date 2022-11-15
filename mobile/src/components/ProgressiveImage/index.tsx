import React from 'react';
import { View, Animated } from 'react-native';

import { styles } from './styles'

interface ProgressiveImageProps {
    thumbnailSource?: any,
    source?: any,
    style?: {},
}

export default class ProgressiveImage extends React.Component<ProgressiveImageProps> {
    constructor(props: ProgressiveImageProps) {
        super(props);
    }

    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {toValue: 1, useNativeDriver: true }).start();
    }

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, { toValue: 1, useNativeDriver: true}).start();
    }

    render() {
        const { thumbnailSource, source, style, ...props } = this.props;

        return (
            <View style={styles.container}>
                <Animated.Image
                    {...props}
                    source={thumbnailSource}
                    style={[style, { opacity: this.thumbnailAnimated }]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={1}
                />
                <Animated.Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    }
}