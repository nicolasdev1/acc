import { httpService } from './httpService';
import * as imagePicker from 'expo-image-picker'

async function updateAvatar(avatar: imagePicker.ImageInfo | undefined): Promise<any> {
    let token = await httpService.getJWT()

    return new Promise((resolve, reject) => {
        let form: FormData | undefined = new FormData()
        
        avatar != undefined ?
            form.append('avatar', {
                name: avatar?.fileName ? avatar.fileName + '_user.jpg' : "_user.jpg",
                uri: avatar?.uri,
                type: 'image/jpg'
            })
        : form.append('avatar', '')

        const config = {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        }
        
        httpService.patch('/users/', form, config)
        .then((response) => {
            resolve({newUri: response.data})
        }).catch((error) => {
            reject( new Error('Desculpe, não foi possível atualizar seu avatar'))
            console.log('updateAvatar error:')
            console.log(error)
        }) 
    })
}

export const userService = {
    updateAvatar
}