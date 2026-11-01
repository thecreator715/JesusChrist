module.exports = Object.assign({ content: ['./index.html', './App.tsx', './components/**/*.tsx', './services/**/*.ts', './data/**/*.ts'], darkMode: 'class' }, {
                theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              serif: ['Lora', 'serif'],
              display: ['Cinzel', 'serif'],
            },
            colors: {
              gold: {
                50: '#FBF8E6',
                100: '#F6EFCD',
                200: '#EBE09B',
                300: '#E0D069',
                400: '#D5C137',
                500: '#CBAF15', // Main Gold
                600: '#A28C11',
                700: '#7A690D',
                800: '#514608',
                900: '#292304',
              },
              stone: {
                850: '#1c1917',
                950: '#0c0a09',
              }
            }
          }
        }
      });
