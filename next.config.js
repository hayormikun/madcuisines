/** @type {import('next').NextConfig} */
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['api.madcuisines.com']
  },
  env: {
   Base_Url: process.env.Base_Url,
  }
}
