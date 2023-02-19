const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключаю плагины к PostCSS
  plugins: [
    // подключаю autoprefixer
    autoprefixer,
    // cssnano при подключении передаю объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
