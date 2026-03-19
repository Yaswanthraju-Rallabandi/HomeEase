import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { AnimatedText } from "./animated-shiny-text";
import { EtherealBeamsDark } from "./ethereal-beams";

export function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 1, 0.32, 1],
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function ShapeLandingHero({
    badge = "HomeEase",
    title1 = "Your Home Problems",
    title2 = "Solved Easily",
    children,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    children?: React.ReactNode;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    } as any;

    return (
        <div className="relative min-h-full w-full flex flex-1 items-center justify-center overflow-hidden bg-black py-12">
            <div className="absolute inset-0 bg-black" />
            <EtherealBeamsDark />
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-blue-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-sky-400/[0.15]"
                    className="right-[-5%] md:right-[0%] bottom-[10%] md:bottom-[15%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 md:mb-12 backdrop-blur-md"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-sm text-gray-300 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight flex flex-col items-center">
                            <AnimatedText 
                                text={title1}
                                className="py-0 mb-2"
                                textClassName="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white"
                                gradientColors="linear-gradient(90deg, rgba(255,255,255,0.4) 45%, #ffffff 50%, rgba(255,255,255,0.4) 55%)"
                                gradientAnimationDuration={5}
                            />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-400 to-blue-600 font-serif italic">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            Expert repairs, cleaning, and maintenance at your fingertips.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full max-w-md mx-auto"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
