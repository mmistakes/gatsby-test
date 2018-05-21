import Typography from 'typography'

const typography = new Typography({
  googleFonts: [
    {
      name: 'Playfair Display',
      styles: [
        '700',
        '700i',
      ],
    },
  ],
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  // headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
})

export default typography
