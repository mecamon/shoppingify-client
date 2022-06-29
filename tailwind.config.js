module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#fafafe',
        'card-bg': '#ffffff',
        'nav-bg': '#ffffff',
        'menu-bg': '#FFF0DE',
        'accent-1': '#80485B',
        'accent-2': '#F9A109',
        'accent-3': '#56CCF2',
        'warning': '#EB5757',
        'common-text': '#000000',
        'labels': '#34333A',
        'icons': '#454545',
        'placeholder': '#BDBDBD',
        'light-text': '#828282',
        'card-icon': '#C1C1C4',
        'disabled': '#C1C1C4',
        'border-common': '#BDBDBD',
        'bubble-label': '#454545',
        'modal': 'rgba(0, 0, 0, 0.5)'
      },
      boxShadow: {
        'card': '0px 1px 4px 1px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}
