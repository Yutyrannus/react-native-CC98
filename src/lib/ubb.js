import './jquery'
import ubbcode from './clientubb'

/*
function ubb (content) {
  let j
  content = content.replace(/\r\n/g, "<BR>").replace(/\n/g, "<BR>")
  var currubb = content
  var preubb = currubb
  for (j = 0; j < 10; j++) {
    if ((currubb = ubbcode(preubb)) != preubb) {
      preubb = currubb
    }
    else
      break
  }
  return currubb
}
*/

function ubb (content) {
  content = content.replace(/\r\n/g, '\n').replace(/\n/g,'\n')
  return content
}

export default ubb
