import ImageColors from "react-native-image-colors"

export const getColorFromImage = async (image: string) => {
    const fallbackColor: string = 'grey';

    const colors = await ImageColors.getColors(image, {
        fallback: fallbackColor,
        key: image,
        cache: true,
        quality: 'high'
    });

    switch(colors.platform){
        case 'android':
            return colors.vibrant ?? fallbackColor;
        case 'ios':
            return colors.primary;
        case 'web':
            return colors.dominant ?? fallbackColor;
    }
}