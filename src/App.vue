<template>

    <router-view/>
    
    </template>
    
    <style>
    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background-color: var(--feb-negro-marca);
      background-image: var(--feb-bg-atmosfera);
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
      color: var(--feb-texto-claro);
    }

    #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      min-height: 100vh;
      min-height: 100dvh;
      color: var(--feb-texto-claro);
      background-color: transparent;
      display: flex;
      flex-direction: column;
    }

    #app > * {
      min-width: 0;
      max-width: 100%;
    }
    </style>
    