const fs = require('fs');
const path = 'style.css';

let content = fs.readFileSync(path, 'utf8');

// Replace hex colors
content = content.replace(/#1a56db/gi, '#004987');
content = content.replace(/#1341b0/gi, '#003666');
content = content.replace(/#ebf1ff/gi, '#ebf3f9');
content = content.replace(/#6c63ff/gi, '#d81a21');
content = content.replace(/#00c9a7/gi, '#0082c8');
content = content.replace(/#ff6b35/gi, '#f36c21');

// Replace rgba
content = content.replace(/26,\s*86,\s*219/g, '0, 73, 135');
content = content.replace(/108,\s*99,\s*255/g, '216, 26, 33');
content = content.replace(/0,\s*201,\s*167/g, '0, 130, 200');
content = content.replace(/255,\s*107,\s*53/g, '243, 108, 33');

// Fix gradients to not be conflicting
content = content.replace(/linear-gradient\(135deg,\s*#004987\s*0%,\s*#d81a21\s*100%\)/gi, 'linear-gradient(135deg, #004987 0%, #0082c8 100%)');
content = content.replace(/linear-gradient\(135deg,\s*#004987\s*0%,\s*#4f46e5\s*50%,\s*#d81a21\s*100%\)/gi, 'linear-gradient(135deg, #d81a21 0%, #e54228 50%, #f36c21 100%)');

fs.writeFileSync(path, content);
console.log('Colors replaced successfully!');
