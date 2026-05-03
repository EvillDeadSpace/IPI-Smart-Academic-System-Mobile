import { UnistylesRegistry } from 'react-native-unistyles';

import { themes, type AppThemes } from './themes';

type AppBreakpoints = {
  sm: number;
  md: number;
  lg: number;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {
    light: AppThemes['light'];
  }
  export interface UnistylesBreakpoints extends AppBreakpoints {
    sm: number;
    md: number;
    lg: number;
  }
}

UnistylesRegistry.addBreakpoints({
  sm: 0,
  md: 768,
  lg: 1024,
});

UnistylesRegistry.addThemes(themes);

UnistylesRegistry.addConfig({
  adaptiveThemes: false,
  initialTheme: 'light',
});
