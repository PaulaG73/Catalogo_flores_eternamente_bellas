<template>

    <router-view/>
    
    </template>
    
    <style>
    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background-color: var(--vin-negro-marca);
      background-image: var(--vin-bg-atmosfera);
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
      color: var(--vin-texto-claro);
    }

    #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      min-height: 100vh;
      color: var(--vin-texto-claro);
      background-color: transparent;
    }
    </style>
    