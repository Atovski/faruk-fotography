'use client';

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import { grain } from './animations';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    line-height: 1.2;
    color: ${theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${theme.transitions.fast};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: ${theme.fonts.body};
    outline: none;
  }

  ::selection {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceLight};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }

  /* Film grain overlay - can be applied to sections */
  .film-grain::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200%;
    background: transparent url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E") repeat;
    animation: ${grain} 8s steps(10) infinite;
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
  }

  /* Container utility */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.lg};

    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: 0 ${theme.spacing.md};
    }
  }

  /* Section utility */
  .section {
    padding: ${theme.spacing['4xl']} 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: ${theme.spacing['3xl']} 0;
    }
  }
`;

export default GlobalStyles;
