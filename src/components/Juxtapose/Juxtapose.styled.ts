// BeforeAfter.styled.ts
import { styled } from "@styles/stitches";

const Wrapper = styled("figure", {
  backgroundColor: "var(--gray-3)",
  display: "flex",
  width: "100%",
  height: "100%",
  padding: "0",
  margin: "0",
  position: "relative",
  overflow: "hidden",
  zIndex: "0",
  borderRadius: "3px",
  transition: "$canopyAll",
  cursor: "ew-resize",
  userSelect: "none",
  touchAction: "none",
});

const ImageContainer = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BaseImage = styled("img", {
  position: "relative",
  zIndex: "1",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  transition: "$canopyAll",
  opacity: 0,
  color: "transparent",
  pointerEvents: "none",

  [`&.loaded`]: {
    opacity: 1,
  },
});

const BeforeImage = styled(BaseImage, {});

const AfterImage = styled(BaseImage, {});

const Slider = styled("div", {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "4px",
  transform: "translateX(-50%)",
  zIndex: "10",
  cursor: "ew-resize",
  transition: "opacity 0.2s ease",

  "&:hover": {
    opacity: 1,
  },

  "&.dragging": {
    opacity: 1,
  },
});

const SliderLine = styled("div", {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "50%",
  width: "2px",
  backgroundColor: "white",
  transform: "translateX(-50%)",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
});

const SliderButton = styled("button", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  border: "2px solid white",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  cursor: "ew-resize",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
  transition: "all 0.2s ease",
  padding: 0,
  outline: "none",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    transform: "translate(-50%, -50%) scale(1.1)",
  },

  "&:active": {
    transform: "translate(-50%, -50%) scale(0.95)",
  },

  "&:focus-visible": {
    outline: "2px solid white",
    outlineOffset: "2px",
  },

  "svg": {
    width: "24px",
    height: "24px",
  },
});

const Label = styled("div", {
  position: "absolute",
  top: "1rem",
  padding: "0.5rem 1rem",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  color: "white",
  fontSize: "0.875rem",
  fontWeight: "600",
  borderRadius: "4px",
  pointerEvents: "none",
  zIndex: "2",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export {
  Wrapper,
  ImageContainer,
  BeforeImage,
  AfterImage,
  Slider,
  SliderButton,
  SliderLine,
  Label
};