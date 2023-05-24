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