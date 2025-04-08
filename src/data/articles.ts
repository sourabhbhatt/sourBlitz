import { Article } from "../types";

const articles: Article[] = [
  {
    id: 1,
    title: "🔐 Securing Your React & React Native Apps with Auth Guards",
    description:
      "Confused about protecting screens in your app? 🤔 Whether you use HOCs, Context API, or custom hooks — this article walks you through building a real-world 🔒 Auth Guard in React Native. Step-by-step code, reusable components, and best practices included! 🚀",
    components: [
      {
        name: "withAuthGuard HOC",
        description:
          "A Higher-Order Component to wrap protected screens with authentication logic.",
        code: `import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const withAuthGuard = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();
    const isAuthenticated = false; // Replace with real auth logic

    if (!isAuthenticated) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
            You need to be logged in to access this screen.
          </Text>
          <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;`,
      },
      {
        name: "App.js",
        description: "The main App component where we use the AuthGuard HOC.",
        code: `import React from 'react';
import { View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import withAuthGuard from './withAuthGuard';

const ProtectedProfileScreen = withAuthGuard(ProfileScreen);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ProtectedProfileScreen />
    </View>
  );
}`,
      },
      {
        name: "ProfileScreen.js",
        description:
          "A protected screen that displays user profile information.",
        code: `import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>Welcome to your Profile!</Text>
  </View>
);

export default ProfileScreen;`,
      },
    ],
  },

  {
    id: 2,
    title: "📦 Clean & Reusable Data Fetching with useFetch Hook",
    description:
      "If you’ve ever felt like data fetching logic clutters your components, this custom hook is your savior 🧼. It separates concerns, keeps your UI clean, and handles loading & error states effortlessly. Give it a try! 🚀",
    components: [
      {
        name: "useFetch Hook",
        description:
          "This custom React hook encapsulates Axios GET requests and manages `loading`, `error`, and `data` states internally.",
        code: `import { useState, useEffect } from 'react';
  import axios from 'axios';
  
  const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
  };
  
  export default useFetch;`,
      },
      {
        name: "MyComponent.tsx",
        description:
          "This component uses `useFetch` to load data and render it. It shows a loading spinner and handles errors gracefully.",
        code: `const MyComponent = () => {
    const { data, loading, error } = useFetch('https://api.example.com/data');
  
    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
  
    return (
      <View>
        {data.map(item => (
          <Text key={item.id}>{item.name}</Text>
        ))}
      </View>
    );
  };`,
      },
    ],
  },
  {
    id: 3,
    title: "🧠 Prevent Double Taps in React Native with a Smart Utility",
    description:
      "Ever had users trigger an action twice by mistake? Double taps on buttons can cause duplicate API calls or unwanted behavior. Here's a reusable `preventDoubleTap` utility to save the day — clean, simple, and effective 🚫👆.",
    components: [
      {
        name: "preventDoubleTap Utility",
        description:
          "Utility to debounce button presses and prevent accidental double taps.",
        code: `let lastTap = 0;
  
  export const preventDoubleTap = (callback, delay = 500) => {
    const now = Date.now();
    if (now - lastTap < delay) return;
    lastTap = now;
    callback();
  };`,
      },
      {
        name: "Usage in Button Component",
        description:
          "How to use `preventDoubleTap` inside your custom button component.",
        code: `import { preventDoubleTap } from './utils/preventDoubleTap';
  
  <TouchableOpacity onPress={() => preventDoubleTap(() => doSomething())}>
    <Text>Submit</Text>
  </TouchableOpacity>`,
      },
    ],
  },
  {
    id: 4,
    title: "🌙 Add Dark Mode Toggle in React Native with Context API",
    description:
      "Dark mode isn't just a feature — it’s a vibe 🖤. This article walks you through how to implement dark/light theme toggling using React Context in a scalable and app-wide way.",
    components: [
      {
        name: "ThemeContext.tsx",
        description: "Global context to manage and toggle the theme.",
        code: `import { createContext, useState, useContext } from 'react';
  
  const ThemeContext = createContext();
  
  export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);
    const toggleTheme = () => setDark(!dark);
  
    return (
      <ThemeContext.Provider value={{ dark, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useTheme = () => useContext(ThemeContext);`,
      },
      {
        name: "Usage in App",
        description: "How to wrap your app and use the toggle.",
        code: `import { useTheme } from './ThemeContext';
  
  const ThemeToggleButton = () => {
    const { dark, toggleTheme } = useTheme();
  
    return (
      <Button
        title={dark ? 'Switch to Light' : 'Switch to Dark'}
        onPress={toggleTheme}
      />
    );
  };`,
      },
    ],
  },
  {
    id: 5,
    title: "💾 Persist Form State on Navigation in React Native using useRef",
    description:
      "Accidentally navigating away from a form and losing user input is frustrating 😵. In this article, you’ll learn how to persist form values without needing a global store like Redux — all with just `useRef()`.",
    components: [
      {
        name: "Form with useRef",
        description: "Using useRef to track field changes across navigation.",
        code: `import { useRef } from 'react';
  
  const formState = useRef({ name: '', email: '' });
  
  <TextInput
    value={formState.current.name}
    onChangeText={(text) => (formState.current.name = text)}
  />
  
  <Button
    title="Save"
    onPress={() => console.log(formState.current)}
  />`,
      },
      {
        name: "Navigation Usage",
        description:
          "Persist form even if you move to another screen and come back.",
        code: `// Simply re-use the same formState ref
  // No need to fetch or reset state on each re-render or navigation cycle`,
      },
    ],
  },
  {
    id: 6,
    title: "🧼 Scalable Folder Structure for React Native Apps",
    description:
      "Tired of tangled files and messy imports? 🥴 Learn how to structure your React Native project using the feature-based approach — making your codebase scalable, readable, and dev-friendly! 🔄",
    components: [
      {
        name: "Project Structure",
        description: "Recommended directory layout based on features/modules.",
        code: `src/
  ├── features/
  │   ├── auth/
  │   │   ├── components/
  │   │   ├── screens/
  │   │   └── authSlice.ts
  │   ├── home/
  │   │   ├── components/
  │   │   └── screens/
  ├── shared/
  │   ├── components/
  │   ├── hooks/
  │   └── utils/
  ├── navigation/
  ├── theme/
  └── App.tsx`,
      },
      {
        name: "Why It Works",
        description:
          "Keeps related files close, improves teamwork, simplifies scaling.",
        code: `// You can import directly from features:
  import LoginScreen from 'features/auth/screens/LoginScreen';
  import useTheme from 'shared/hooks/useTheme';`,
      },
    ],
  },
  {
    id: 7,
    title: "🦋 Animate List Items in FlatList with Reanimated 3",
    description:
      "Want your UI to feel buttery smooth? 🍦 Learn how to animate list items as they enter the screen using FlatList + Reanimated 3 — perfect for chat apps, notifications, or modern dashboards.",
    components: [
      {
        name: "AnimatedFlatList",
        description:
          "Using Reanimated 3's `Animated.View` inside FlatList's renderItem.",
        code: `import Animated, { FadeInDown } from 'react-native-reanimated';
  
  <FlatList
    data={messages}
    renderItem={({ item }) => (
      <Animated.View entering={FadeInDown}>
        <MessageCard message={item} />
      </Animated.View>
    )}
  />`,
      },
      {
        name: "Why It's Awesome",
        description: "Delivers native-feeling UX with minimal effort.",
        code: `// Easily stack animations, use with ScrollView too
  entering={FadeInDown.duration(300).springify().mass(0.5)}`,
      },
    ],
  },
  {
    id: 8,
    title: "📲 Debounce API Calls in Search Input (Real-time UX)",
    description:
      "Don't flood your API on every keystroke! 😵‍💫 This article shows how to debounce input fields in React/React Native to reduce load, save battery, and deliver a polished search experience 🔍.",
    components: [
      {
        name: "Debounced Search Input",
        description:
          "Debounce `onChangeText` using `useCallback` and `setTimeout`.",
        code: `const [query, setQuery] = useState('');
  
  const debouncedSearch = useCallback(() => {
    const timeout = setTimeout(() => {
      searchAPI(query); // Call your API
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);
  
  useEffect(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [query]);
  
  <TextInput
    placeholder="Search..."
    onChangeText={setQuery}
  />`,
      },
      {
        name: "Bonus: lodash.debounce",
        description: "You can also use lodash’s debounce for cleaner code.",
        code: `import debounce from 'lodash.debounce';`,
      },
    ],
  },
  
];

export default articles;
