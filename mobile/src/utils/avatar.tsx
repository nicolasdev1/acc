import { useAuth } from "../contexts/Auth";
import { Image, View } from 'react-native';

import { styles as profileStyles } from '../screens/Profile/styles'
import { defaultStyles } from "../theme/styles";
import ProgressiveImage from "../components/ProgressiveImage";

export function handleUserAvatar(screen?: string) {
    const { auther } = useAuth()
    const user = auther?.user

    return (
        <ProgressiveImage
            style={
                screen == 'profile' ? profileStyles.image : defaultStyles.avatar
            }
            source={
                user?.avatar != '' && user.avatar != undefined ? { uri: user.avatar } : 
                user?.gender == 'F' ? require('../../assets/user-silhouette-female.png') : require('../../assets/user-silhouette-male.png')
            }
        />
    )
}