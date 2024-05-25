import markdownit from 'markdown-it'
const md = markdownit()
const terminal = require('markdown-it-terminal');
import styles from 'ansi-styles';

function compoundStyle(styleList:any[]) {
    var open  = '';
    var close = '';
    styleList.forEach(function(style:any){
      open += styles[style].open;
    });
    styleList.reverse().forEach(function(style:any) {
      close += styles[style].close;
    });
    
    return {
      open: open, 
      close: close
    };
  };

var options = {
    styleOptions: {
      code: styles.blue,
      codespan: styles.blue,
      link: compoundStyle(["blue","underline"])
    }
  }
md.use(terminal,options);
console.log(md.render(await Bun.file("HELP.md").text()))