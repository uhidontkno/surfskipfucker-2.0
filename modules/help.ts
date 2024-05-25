import markdownit from 'markdown-it'
const md = markdownit()
var terminal = require('markdown-it-terminal');
import styles from 'ansi-styles';
var options = {
    styleOptions: {
      code: styles.blue,
      codespan: styles.blue,
    }
  }
md.use(terminal,options);
console.log(md.render(await Bun.file("HELP.md").text()))