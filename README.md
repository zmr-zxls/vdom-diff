# vdom-diff

```js
patch(['a', 'b', 'c'], ['a', 'd', 'c', 'b'])
// 输出
a保持不变 [ 'a', 'b', 'c' ]
b->c后面 [ 'a', 'c', 'b' ]
c->c后面 [ 'a', 'c', 'b' ]
dom[1] 插入 d
最后结果:  [ 'a', 'd', 'c', 'b' ]
```

```js
patch(['a', 'b', 'd', 'e', 'c'], ['c', 'g', 'f', 'e'])
// 输出
c->a前面 [ 'c', 'a', 'b', 'd', 'e' ]
e保持不变 [ 'c', 'a', 'b', 'd', 'e' ]
dom[1] 插入g [ 'c', 'g', 'a', 'b', 'd', 'e' ]
dom[1] 插入f [
  'c', 'g', 'f',
  'a', 'b', 'd',
  'e'
]
3 ~ 5 删除
最后结果:  [ 'c', 'g', 'f', 'e' ]
```

```js
patch(['a','c', 'e', 'z', 'g', 'h', 'b'], ['z', 'h', 'g', 'b', 'a', 'e', 'c'])
// 输出
z->a前面  [
  'z', 'a', 'c',
  'e', 'g', 'h',
  'b'
]
h->a前面  [
  'z', 'h', 'a',
  'c', 'e', 'g',
  'b'
]
g->a前面  [
  'z', 'h', 'g',
  'a', 'c', 'e',
  'b'
]
b->a前面 [
  'z', 'h', 'g',
  'b', 'a', 'c',
  'e'
]
a保持不变 [
  'z', 'h', 'g',
  'b', 'a', 'c',
  'e'
]
c->e后面 [
  'z', 'h', 'g',
  'b', 'a', 'e',
  'c'
]
e保持不变 [
  'z', 'h', 'g',
  'b', 'a', 'e',
  'c'
]
最后结果:  [
  'z', 'h', 'g',
  'b', 'a', 'e',
  'c'
]
```
