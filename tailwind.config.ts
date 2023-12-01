import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
		'primary' : '#16ABF8',
		'error' : '#ED4C5C'
	  } ,
	  screens : {
		lm : '992px',
		lx : '576px'
	  }
    },
  },
  plugins: [],
}
export default config
