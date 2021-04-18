import React, { useEffect, useState } from "react";
import { AppearanceProvider, Appearance } from 'react-native-appearance';
import WalkthroughScreen from "./src/screens/WalkthroughScreen/WalkthroughScreen";
import WalkthroughAppConfig from "./src/WalkthroughAppConfig";
import DynamicAppStyles from "./src/DynamicAppStyles";
import {StyleSheet } from "react-native";
import {Button} from 'react-native-paper';

const WelcomeScreen = (props) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        Appearance.addChangeListener(({ colorScheme }) => {
          setColorScheme(colorScheme);
        });
      });

      return (
        <AppearanceProvider>
          <WalkthroughScreen
            appConfig={WalkthroughAppConfig}
            appStyles={DynamicAppStyles}
          />
            <Button color='white' compact={true} mode="contained" onPress={() =>props.navigation.navigate('Main')}>
            Skip Introduction
           </Button>
        </AppearanceProvider>
      );
}

const styles= StyleSheet.create({
})

export default WelcomeScreen;