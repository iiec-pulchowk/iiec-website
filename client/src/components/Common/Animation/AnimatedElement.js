"use client"
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0"
  },
  fadeIn: {
    hidden: "opacity-0",
    visible: "opacity-100"
  },
  scaleUp: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100"
  },
  slideRight: {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0"
  },
  slideLeft: {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0"
  }
};

const AnimatedElement = ({ 
  children, 
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 500,
  threshold = 0.2,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once
  });

  useEffect(() => {
    if (!inView && !once) {
      setIsVisible(false);
    }
    if (inView && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, isVisible, delay, once]);

  const animationVariant = ANIMATION_VARIANTS[variant] || ANIMATION_VARIANTS.fadeUp;
  const transitionStyle = `transition-all duration-${duration} ease-out`;
  const animationClass = isVisible ? animationVariant.visible : animationVariant.hidden;

  return (
    <div
      ref={ref}
      className={`${transitionStyle} ${animationClass} ${className}`}
      style={{ 
        willChange: 'opacity, transform',
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

// Preset animation components for common use cases
export const FadeIn = (props) => (
  <AnimatedElement variant="fadeIn" {...props} />
);

export const FadeUp = (props) => (
  <AnimatedElement variant="fadeUp" {...props} />
);

export const ScaleUp = (props) => (
  <AnimatedElement variant="scaleUp" {...props} />
);

export const SlideRight = (props) => (
  <AnimatedElement variant="slideRight" {...props} />
);

export const SlideLeft = (props) => (
  <AnimatedElement variant="slideLeft" {...props} />
);

export default AnimatedElement;