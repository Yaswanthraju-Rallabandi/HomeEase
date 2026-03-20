import * as React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedTextProps extends HTMLMotionProps<"span"> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
      gradientAnimationDuration = 1,
      hoverEffect = false,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: "100% 0%",
      },
      animate: {
        backgroundPosition: "0% 0%",
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "linear",
        },
      },
    };

    return (
      <motion.span
        ref={ref}
        className={cn("inline-block leading-normal", textClassName, className)}
        style={{
          backgroundImage: gradientColors,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
        } as React.CSSProperties}
        variants={textVariants}
        initial="initial"
        animate="animate"
        onHoverStart={() => hoverEffect && setIsHovered(true)}
        onHoverEnd={() => hoverEffect && setIsHovered(false)}
        {...props}
      >
        {text}
      </motion.span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
