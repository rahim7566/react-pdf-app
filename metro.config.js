const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add pdf to the asset extensions array
config.resolver.assetExts.push('pdf');

module.exports = config;
