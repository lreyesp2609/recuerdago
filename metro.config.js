const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configurar alias para resolver @/*
config.resolver.alias = {
  '@': path.resolve(__dirname, './'),
};

module.exports = config;