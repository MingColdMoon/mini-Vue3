# 简易版Vue3
## 目前实现功能
### 1. reactive
| 参数 | 类型 | 描述 |
| - | - | - |
| object | Object | 要被proxy代理的对象

### 2. effect
| 参数 | 类型 | 描述 |
| - | - | - |
| fn | Function | 函数内的响应式对象会被触发
| options | Object | 选项配置，如下表
| scheduler | Function | 响应式触发后要执行的函数，返回当前fn
| onStop | Function | 函数外调用stop方法传入一个effect后，执行该onStop回调

### 3. readonly
| 参数 | 类型 | 描述 |
| - | - | - |
| object | Function | 接受一个响应式对象，将对象转换为只读

### 4. isReadOnly
| 参数 | 类型 | 描述 |
| - | - | - |
| object | Function | 接受一个响应式对象，判断是否是只读

### 5. isReactive
| 参数 | 类型 | 描述 |
| - | - | - |
| object | Function | 接受一个响应式对象，判断是否是响应式对象
