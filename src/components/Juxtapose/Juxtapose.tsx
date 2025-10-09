// BeforeAfter.tsx
import {
  Wrapper,
  ImageContainer,
  BeforeImage,
  AfterImage,
  Slider,
  SliderButton,
  SliderLine,
  Label
} from "@components/Juxtapose/Juxtapose.styled";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getResourceImage } from "@hooks/getResourceImage";

interface BeforeAfterProps {
  beforeResource: any;
  afterResource: any;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  region?: string;
  size?: string;
  initialPosition?: number; // 0-100, default 50
}

const Juxtapose: React.FC<BeforeAfterProps> = ({
  beforeResource,
  afterResource,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  region = "full",
  size = "1200,",
  initialPosition = 50,
}) => {
  const [beforeImage, setBeforeImage] = useState<string>();
  const [afterImage, setAfterImage] = useState<string>();
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If beforeResource is a string (URL), use it directly, otherwise process it
    const beforeImg = typeof beforeResource === 'string'
      ? beforeResource
      : getResourceImage(beforeResource, size, region);
    const afterImg = typeof afterResource === 'string'
      ? afterResource
      : getResourceImage(afterResource, size, region);

    setBeforeImage(beforeImg);
    setAfterImage(afterImg);

    if (beforeImgRef?.current && beforeImgRef.current.complete) {
      setBeforeLoaded(true);
    }
    if (afterImgRef?.current && afterImgRef.current.complete) {
      setAfterLoaded(true);
    }
  }, [beforeResource, afterResource, size, region]);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging]);

  const allLoaded = beforeLoaded && afterLoaded;

  return (
    <Wrapper ref={containerRef} className={clsx(allLoaded && "loaded")}>
      {/* After Image (bottom layer) */}
      <ImageContainer>
        <AfterImage
          ref={afterImgRef}
          src={afterImage}
          alt={afterAlt}
          onLoad={() => setAfterLoaded(true)}
          className={clsx("source", afterLoaded && "loaded")}
        />
        {afterLabel && (
          <Label className="after-label" css={{ right: "1rem" }}>
            {afterLabel}
          </Label>
        )}
      </ImageContainer>

      {/* Before Image (top layer with clip) */}
      <ImageContainer
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          zIndex: 2
        }}
      >
        <BeforeImage
          ref={beforeImgRef}
          src={beforeImage}
          alt={beforeAlt}
          onLoad={() => setBeforeLoaded(true)}
          className={clsx("source", beforeLoaded && "loaded")}
        />
        {beforeLabel && (
          <Label className="before-label" css={{ left: "1rem" }}>
            {beforeLabel}
          </Label>
        )}
      </ImageContainer>

      {/* Slider */}
      <Slider
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={clsx(isDragging && "dragging")}
      >
        <SliderLine />
        <SliderButton aria-label="Drag to compare images">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </SliderButton>
      </Slider>
    </Wrapper>
  );
};

export default Juxtapose;