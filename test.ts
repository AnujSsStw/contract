const a = JSON.stringify(
  '!@#!$$!%)(*&^%$#(*&^%$!@#$%^&*()QWERTYUIO:":":":?>?<<||\\\\\````nnnnn      ~~~~~',
);

console.log(a);

const b = JSON.parse(a);

console.log(b);
