// middleware pattern (chain of responsability)

const exec = (context, ...middlewares) => {
  const run = (current) => {
    middlewares &&
      current < middlewares.length &&
      middlewares[current](context, () => run(current + 1));
  };
  run(0);
};

const mid1 = (context, next) => {
  context.info1 = 'mid1';
  next();
};

const mid2 = (context, next) => {
  context.info2 = 'mid2';
  next();
};

const mid3 = (context) => (context.info3 = 'mid3');

let context = {};

exec(context, mid1, mid2, mid3);
console.log(context);
