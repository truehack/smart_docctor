import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({ children, style, ...rest }: ViewProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View
            {...rest}
            style={[
                {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
            ]}
        >
            <View {...rest} style={{ flex: 1, ...StyleSheet.flatten(style) }}>
                {children}
            </View>
        </View>
    );
}
