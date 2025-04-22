import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator ,Image , ImageSourcePropType} from 'react-native';
import {colors} from '../theme/colors';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'icon';

interface CustomButtonProps {
  title?: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  iconStyle?: any;
  variant?: ButtonType;
  size?: 'small' | 'medium' | 'large';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  icon,
  iconStyle,
  variant = 'primary',
  size = 'medium',
}) => {
  const buttonStyle = () => {
    const baseStyle: ViewStyle[] = [styles.button];
    
    switch (variant) {
      case 'primary':
        baseStyle.push({...styles.button, backgroundColor: colors.color.green});
        break;
      case 'secondary':
        baseStyle.push({...styles.button, backgroundColor: colors.background.backgroundWhite, borderWidth: 1, borderColor: colors.color.green});
        break;
      case 'outline':
        baseStyle.push({...styles.button, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.color.green});
        break;
      case 'icon':
        baseStyle.push({...styles.button, backgroundColor: 'transparent', padding: 8});
        break;
    }

    switch (size) {
      case 'small':
        baseStyle.push({...styles.button, paddingVertical: 8, paddingHorizontal: 12});
        break;
      case 'large':
        baseStyle.push({...styles.button, paddingVertical: 16, paddingHorizontal: 24});
        break;
    }

    if (disabled) {
      baseStyle.push({...styles.button, opacity: 0.6});
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle[] = [styles.buttonText];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push({...styles.buttonText, color: colors.color.green});
        break;
      case 'outline':
        baseStyle.push({...styles.buttonText, color: colors.color.green});
        break;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...buttonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : colors.color.green} />
      ) : (
        <>
          {icon && (
            <Image 
              source={icon} 
              style={[styles.icon, iconStyle]} 
              resizeMode="contain"
            />
          )}
          {title && <Text style={[...getTextStyle(), textStyle]}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default CustomButton; 