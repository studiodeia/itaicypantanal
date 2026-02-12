// Itaicy Pantanal - Design System Utilities
// Auto-generated utilities based on extracted patterns

const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, addComponents, theme }) {

  // ============================================
  // TYPOGRAPHY UTILITIES
  // ============================================

  const typographyUtilities = {
    // Display
    '.text-display-lg': {
      fontFamily: 'var(--display-lg-font-family)',
      fontSize: 'var(--display-lg-font-size)',
      fontWeight: 'var(--display-lg-font-weight)',
      lineHeight: 'var(--display-lg-line-height)',
      letterSpacing: 'var(--display-lg-letter-spacing)',
      fontStyle: 'var(--display-lg-font-style)',
      fontFeatureSettings: "'lnum' 1, 'pnum' 1",
    },

    // Headings
    '.text-heading-lg': {
      fontFamily: 'var(--heading-lg-font-family)',
      fontSize: 'var(--heading-lg-font-size)',
      fontWeight: 'var(--heading-lg-font-weight)',
      lineHeight: 'var(--heading-lg-line-height)',
      letterSpacing: 'var(--heading-lg-letter-spacing)',
      fontStyle: 'var(--heading-lg-font-style)',
    },
    '.text-heading-md': {
      fontFamily: 'var(--heading-md-font-family)',
      fontSize: 'var(--heading-md-font-size)',
      fontWeight: 'var(--heading-md-font-weight)',
      lineHeight: 'var(--heading-md-line-height)',
      letterSpacing: 'var(--heading-md-letter-spacing)',
      fontStyle: 'var(--heading-md-font-style)',
    },
    '.text-heading-sm': {
      fontFamily: 'var(--heading-sm-font-family)',
      fontSize: 'var(--heading-sm-font-size)',
      fontWeight: 'var(--heading-sm-font-weight)',
      lineHeight: 'var(--heading-sm-line-height)',
      letterSpacing: 'var(--heading-sm-letter-spacing)',
      fontStyle: 'var(--heading-sm-font-style)',
      fontFeatureSettings: "'lnum' 1, 'pnum' 1",
    },

    // Body
    '.text-body-lg': {
      fontFamily: 'var(--body-lg-font-family)',
      fontSize: 'var(--body-lg-font-size)',
      fontWeight: 'var(--body-lg-font-weight)',
      lineHeight: 'var(--body-lg-line-height)',
      letterSpacing: 'var(--body-lg-letter-spacing)',
      fontStyle: 'var(--body-lg-font-style)',
    },
    '.text-body-md': {
      fontFamily: 'var(--body-md-font-family)',
      fontSize: 'var(--body-md-font-size)',
      fontWeight: 'var(--body-md-font-weight)',
      lineHeight: 'var(--body-md-line-height)',
      letterSpacing: 'var(--body-md-letter-spacing)',
      fontStyle: 'var(--body-md-font-style)',
    },
    '.text-body-sm': {
      fontFamily: 'var(--body-sm-font-family)',
      fontSize: 'var(--body-sm-font-size)',
      fontWeight: 'var(--body-sm-font-weight)',
      lineHeight: 'var(--body-sm-line-height)',
      letterSpacing: 'var(--body-sm-letter-spacing)',
      fontStyle: 'var(--body-sm-font-style)',
    },
    '.text-body-xs': {
      fontFamily: 'var(--body-xs-font-family)',
      fontSize: 'var(--body-xs-font-size)',
      fontWeight: 'var(--body-xs-font-weight)',
      lineHeight: 'var(--body-xs-line-height)',
      letterSpacing: 'var(--body-xs-letter-spacing)',
      fontStyle: 'var(--body-xs-font-style)',
    },

    // Functional
    '.text-functional-md': {
      fontFamily: 'var(--functional-md-font-family)',
      fontSize: 'var(--functional-md-font-size)',
      fontWeight: 'var(--functional-md-font-weight)',
      lineHeight: 'var(--functional-md-line-height)',
      letterSpacing: 'var(--functional-md-letter-spacing)',
      fontStyle: 'var(--functional-md-font-style)',
    },
    '.text-functional-lg': {
      fontFamily: 'var(--functional-lg-font-family)',
      fontSize: 'var(--functional-lg-font-size)',
      fontWeight: 'var(--functional-lg-font-weight)',
      lineHeight: 'var(--functional-lg-line-height)',
      letterSpacing: 'var(--functional-lg-letter-spacing)',
      fontStyle: 'var(--functional-lg-font-style)',
    },
    '.text-functional-sm': {
      fontFamily: 'var(--functional-sm-font-family)',
      fontSize: 'var(--functional-sm-font-size)',
      fontWeight: 'var(--functional-sm-font-weight)',
      lineHeight: 'var(--functional-sm-line-height)',
      letterSpacing: 'var(--functional-sm-letter-spacing)',
      fontStyle: 'var(--functional-sm-font-style)',
    },

    // Serif Italic (for emphasis in headings)
    '.text-serif-italic': {
      fontFamily: "'Playfair Display', serif",
      fontStyle: 'italic',
    },

    // Lead
    '.text-lead-md': {
      fontFamily: 'var(--lead-md-font-family)',
      fontSize: 'var(--lead-md-font-size)',
      fontWeight: 'var(--lead-md-font-weight)',
      lineHeight: 'var(--lead-md-line-height)',
      letterSpacing: 'var(--lead-md-letter-spacing)',
      fontStyle: 'var(--lead-md-font-style)',
    },
  };

  // ============================================
  // COLOR UTILITIES (Paleta Pantanal)
  // ============================================

  const colorUtilities = {
    // Backgrounds - Dark
    '.bg-dark-primary': { backgroundColor: '#152218' },
    '.bg-dark-secondary': { backgroundColor: '#263a30' },
    '.bg-medium': { backgroundColor: '#344e41' },
    '.bg-dark-overlay': { backgroundColor: 'rgba(10, 19, 12, 0.2)' },
    '.bg-dark-overlay-heavy': { backgroundColor: 'rgba(10, 19, 12, 0.4)' },

    // Backgrounds - Light
    '.bg-cream': { backgroundColor: '#fcf4ed' },

    // Text colors - On dark backgrounds
    '.text-primary-light': { color: '#e3f7ec' },
    '.text-secondary-light': { color: '#f2fcf7' },
    '.text-muted-green': { color: '#a8cab9' },
    '.text-tertiary': { color: '#cfebdd' },
    '.text-highlight': { color: '#d7a45d' },
    '.text-quarternary': { color: '#6c927f' },
    '.text-number-muted': { color: '#8aad9c' },

    // Text colors - On light/cream backgrounds
    '.text-dark-primary': { color: '#263a30' },
    '.text-dark-secondary': { color: '#446354' },
    '.text-dark-muted': { color: '#8aad9c' },

    // Accent
    '.bg-accent-gold': { backgroundColor: '#ac8042' },
    '.text-accent-gold': { color: '#ac8042' },
    '.text-highlight-gold': { color: '#d7a45d' },

    // Borders
    '.border-light': { borderColor: '#446354' },
    '.border-primary-light': { borderColor: '#f2fcf7' },
    '.border-muted': { borderColor: '#a8cab9' },
  };

  // ============================================
  // LAYOUT COMPONENTS
  // ============================================

  const layoutComponents = {
    // Container padrão
    '.container-pantanal': {
      maxWidth: '1440px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },

    // Section padding responsivo (px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px])
    '.section-padding': {
      paddingLeft: '1.25rem', // 20px
      paddingRight: '1.25rem',
      paddingTop: '3rem', // 48px
      paddingBottom: '3rem',
      '@media (min-width: 768px)': {
        paddingLeft: '2rem', // 32px
        paddingRight: '2rem',
        paddingTop: '4rem', // 64px
        paddingBottom: '4rem',
      },
      '@media (min-width: 1024px)': {
        paddingLeft: '4rem', // 64px - alinhado com lg:px-16 usado na maioria das sections
        paddingRight: '4rem',
        paddingTop: '6.25rem', // 100px
        paddingBottom: '6.25rem',
      },
    },

    // Vertical gaps responsivos
    '.gap-section': {
      gap: '3rem', // 48px mobile
      '@media (min-width: 768px)': {
        gap: '4rem', // 64px tablet
      },
      '@media (min-width: 1024px)': {
        gap: '6.25rem', // 100px desktop
      },
    },
  };

  // ============================================
  // GLASSMORPHISM COMPONENTS
  // ============================================

  const glassComponents = {
    // Hero glass card
    '.glass-card-hero': {
      backgroundColor: 'rgba(10, 19, 12, 0.2)',
      borderRadius: '0.5rem',
      backdropFilter: 'blur(2px) brightness(110%)',
      WebkitBackdropFilter: 'blur(2px) brightness(110%)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 1px 0 0 rgba(255, 255, 255, 0.32), inset 0 -1px 1px rgba(0, 0, 0, 0.13), inset -1px 0 1px rgba(0, 0, 0, 0.11)',
      border: '0',
    },

    // Menu backdrop glass
    '.glass-backdrop': {
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
    },

    // Dropdown menu glass
    '.glass-menu-item': {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
    },
  };

  // ============================================
  // OVERLAY GRADIENTS
  // ============================================

  const overlayUtilities = {
    // Hero overlay
    '.overlay-hero': {
      background: 'linear-gradient(0deg, rgba(21, 34, 24, 0.5) 0%, rgba(21, 34, 24, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.32) 100%)',
    },

    // Card image overlay (bottom gradient)
    '.overlay-card-bottom': {
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 31.13%, rgba(0, 0, 0, 0.64) 73.89%), linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.16) 100%)',
    },

    // Menu blur overlay
    '.overlay-menu': {
      backgroundColor: 'rgba(21, 34, 24, 0.7)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    },
  };

  // ============================================
  // BUTTON VARIANTS (Extended)
  // ============================================

  const buttonComponents = {
    // Gold button (CTA principal)
    '.btn-gold': {
      backgroundColor: '#ac8042',
      color: '#f2fcf7',
      borderRadius: '0.25rem', // 4px (rounded)
      paddingTop: '0.5rem',    // 8px
      paddingBottom: '0.5rem',
      paddingLeft: '1rem',     // 16px
      paddingRight: '1rem',
      fontFamily: 'var(--functional-sm-font-family)',
      fontSize: 'var(--functional-sm-font-size)',
      fontWeight: 'var(--functional-sm-font-weight)',
      lineHeight: 'var(--functional-sm-line-height)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#8f6a35', // pantanal-gold-hover
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
        opacity: '0.9',
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(172, 128, 66, 0.4)',
      },
    },

    // Nav button (desktop)
    '.btn-nav': {
      height: 'auto',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.625rem',
      paddingBottom: '0.625rem',
      borderRadius: '0.5rem',
      transition: 'color 0.2s',
    },
  };

  // ============================================
  // CARD VARIANTS
  // ============================================

  const cardComponents = {
    // Expedition card
    '.card-expedition': {
      height: '29rem', // 464px mobile
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '0',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '@media (min-width: 768px)': {
        height: '31.25rem', // 500px tablet
      },
      '@media (min-width: 1024px)': {
        height: '46.25rem', // 740px desktop
      },
    },

    // Testimonial card
    '.card-testimonial': {
      flexShrink: 0,
      width: '310px',
      height: '400px',
      backgroundColor: '#263a30',
      border: 'none',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      '@media (min-width: 768px)': {
        width: '360px',
        height: '420px',
      },
      '@media (min-width: 1024px)': {
        width: '443px',
        height: '464px',
      },
    },

    // Blog card
    '.card-blog': {
      flexShrink: 0,
      width: '350px',
      height: 'auto',
      backgroundColor: '#263a30',
      border: 'none',
      borderRadius: '0.5rem',
      overflow: 'hidden',
    },
  };

  // ============================================
  // ANIMATION UTILITIES
  // ============================================

  const animationUtilities = {
    '.transition-smooth': {
      transition: 'all 0.2s ease',
    },
    '.transition-colors-smooth': {
      transition: 'color 0.2s ease, background-color 0.2s ease',
    },
    '.hover-translate-x': {
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateX(0.25rem)',
      },
    },

    // Link hover underline animation
    '.link-hover': {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'opacity 0.2s ease',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: '0',
        width: '0',
        height: '1px',
        backgroundColor: 'currentColor',
        transition: 'width 0.3s ease',
      },
      '&:hover::after': {
        width: '100%',
      },
    },

    // Green-tinted shadows
    '.shadow-pantanal': {
      boxShadow: '0 20px 40px -10px rgba(21, 34, 24, 0.3)',
    },
    '.shadow-pantanal-sm': {
      boxShadow: '0 4px 12px -2px rgba(21, 34, 24, 0.2)',
    },
  };

  // Adicionar utilities
  addUtilities(typographyUtilities);
  addUtilities(colorUtilities);
  addUtilities(overlayUtilities);
  addUtilities(animationUtilities);

  // Adicionar components
  addComponents(layoutComponents);
  addComponents(glassComponents);
  addComponents(buttonComponents);
  addComponents(cardComponents);
});
