import { extendTheme } from "@chakra-ui/react";

const colors = {
  black900: "#424242",
  black500: "#6b6b6b",
  black300: "#949494",
  black100: "#eaeaea",
};
const styles = {
  global: {
    body: {
      color: "black900",
      fontSize: "13px",
      fontFamily: "body",
      a: {
        w: "fit-content",
        textDecoration: "underline",
        opacity: 1,
        transition: "opacity 0.2s",
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
      },
      li: {
        listStyleType: "none",
      },
      pre: {
        fontFamily: "body",
        whiteSpace: "pre-wrap",
      },
    },
    "::selection": {
      color: "black900",
      background: "rgba(240, 240, 240, 0.6)",
    },
    "::-moz-selection": {
      color: "black900",
      background: "rgba(240, 240, 240, 0.6)",
    },
  },
};
const fonts = {
  body: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
};
const breakpoints = {
  sm: "480px",
  md: "560px",
  lg: "600px",
};
const textStyles = {};

const theme = extendTheme({
  styles,
  colors,
  fonts,
  textStyles,
  breakpoints,
});

export default theme;
