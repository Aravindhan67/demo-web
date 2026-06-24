import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  style?: React.CSSProperties;
}

export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  style = {}
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  const getDirectionStyle = () => {
    if (isIntersecting) {
      return {
        opacity: 1,
        transform: direction === 'none' ? 'none' : 'translate(0, 0)',
      };
    }

    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(24px)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-24px)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(24px)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-24px)' };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...getDirectionStyle(),
        ...style
      }}
    >
      {children}
    </div>
  );
}
