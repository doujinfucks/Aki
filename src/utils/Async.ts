const nodeVersion = parseInt(process.versions.node.split('.'), 10);

function promisify(fn: any){
  if(nodeVersion >= 8) return require('util').promisify(fn);
  let name = fn.name;
  name = (name || '').replace(/\s|bound(?!$)/g, '');
  function newFunction(...args) {
  const arg = [];
  for (const key of Object.keys(args)) arg.push(args[key]);
  return new Promise((resolve, reject) =>
    fn.apply(this, [...args, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    }]));
  }
Object.defineProperty(newFunction, 'name', { value: name });
return newFunction;
}
function promisifyAll(obj: any, suffix = 'Async'){
  const newObj = Object.getPrototypeOf(obj);
  for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
  if (typeof obj[key] !== 'function') continue;
  obj[`${key}${suffix}`] = this.promisify(obj[key]);
}
return obj;
}

function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
}
export {
  promisify,
  promisifyAll,
  delay
}
