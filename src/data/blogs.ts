import demoGif from "../assets/demo.gif";
import demo1Gif from "../assets/demo1.gif";
// import eyeGif from "../assets/otp-eye.gif";
// import pullGif from "../assets/pull-refresh.gif";
// import dropGif from "../assets/object-drop.gif";
// import fruitNinjaGif from "../assets/fruit-ninja.gif";

const blogData = [
  {
    id: 1,
    title: "Bringing Life to Navigation – One Curve at a Time",
    disabled: false,
    thumbnail:
      "data:image/jpeg;base64,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",
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExem1qM3ZjN3VhZjRxemI3NGV0M3VqdTNncWt1b2RwNmpuYW54Njl6MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vQXZiBGhxBEALEk/giphy.gif",
    overview: `🌀 Custom Bottom Navigation Bar in React Native using Tab Stack, Reanimated 3 & SVGs
▶️ 5 tabs – each with a satisfying pop-up animation
🌟 A floating center tab for that elevated action
⚡ A dynamic animated highlighter that glides across tabs in a curved path`,
    components: [
      {
        name: "Header",
        description: "Handles the navigation and dynamic scroll-based styling.",
        code: `import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const Header = () => {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    return scrollY.onChange((y) => setScrolled(y > 10))
  }, [scrollY])

  return (
    <motion.header animate={{
      backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'white',
      padding: scrolled ? '0.5rem' : '1rem'
    }} className="fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">SourBlitz</h1>
    </motion.header>
  )
}

export default Header;`,
      },
    ],
  },

  {
    id: 2,
    title: "👁️ OTP Input Tracker – Animated Eyes Following You",
    disabled: false,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXG9m14ADhHlvXW4tnfH86LJPz7VOBOQL-1w&s",
    image: demo1Gif,
    overview: `A fun and engaging OTP input screen where cartoon eyes follow the user's input.
🎯 Built with SVGs + Reanimated 3
👀 Eyes animate with focus and blink on blur
💡 Smooth UX while typing your OTP`,
    components: [
      {
        name: "OTPInputEyes.tsx",
        description:
          "Eye animation follows the current OTP field being focused.",
        code: `// You'd include logic with shared values, input focus handlers, and SVG transformations using Reanimated 3`,
      },
    ],
  },

  {
    id: 3,
    title: "🌊 Custom Pull-to-Refresh with Animated Feedback",
    disabled: true,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH7imbVNs0BrGcxF8nkAynnPzkmtCskoPfFg&s",
    image: demoGif,
    overview: `Ditch the boring spinner — here's how you can animate your own refresh behavior.
🔄 Built with Reanimated 3 and SVGs
🌀 Ripple effect, smiley face, or rocket blast-off animations
✅ Enhances user delight and brand personality`,
    components: [],
  },

  {
    id: 4,
    title: "🍬 Seamless Object Rain – A Animation Loop",
    disabled: true,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggawijyetRIBWtigdHBPg2SfluPVO6VGf9Q&s",
    image: demo1Gif,
    overview: `Animate objects or emojis falling from the top in a smooth endless loop.
🍭 Great for celebrations, gamified apps, or subtle UI delight
⚙️ Skia-powered with constant frame-rate
🔁 Repeats infinitely without frame drops`,
    components: [],
  },

  {
    id: 5,
    title: "⚔️ Fruit Ninja – React Native Game (Coming Soon)",
    disabled: true,
    thumbnail:
      "data:image/jpeg;base64,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",
    image: demo1Gif,
    overview: `Yes, we're doing it! 🍉 A complete Fruit Ninja-style game built in React Native.
✂️ Swipe to slice
🎮 Score tracking & sound effects
🔥 Coming soon with Reanimated 3 + Skia magic`,
    components: [],
  },
];

export default blogData;
