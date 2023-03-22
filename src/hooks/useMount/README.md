
## useMount

只在组件 `mount` 的时候才执行的 `hook`。

## 代码演示

```typescript
useMount(() => {
  console.log('组件加载');
});
```

## API

```typescript
useMount(fn: () => void );
```

## 参数

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | mount 时执行的函数 | `() => void` | -      |
