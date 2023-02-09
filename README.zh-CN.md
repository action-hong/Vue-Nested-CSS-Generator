# Vue Nested CSS Generator

<a href="https://marketplace.visualstudio.com/items?itemName=kkopite.vue-nested-css-generator" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/kkopite.vue-nested-css-generator.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>

简体中文 | [English](./README.md)

## 动机

开发 Vue 时，经常编写与模板结构相匹配的 CSS 代码，耗时且容易出错。该 VSCode 插件旨在通过基于模板结构自动生成 CSS 代码来简化这个过程。

## 使用

![test](./vncg.gif)

你可以通过以下几种方法来生成css:

1. 在编辑器中右键单击，从上下文菜单中选择“generate nested css”命令。
2. 打开命令面板（在Windows上按Ctrl + Shift + P，在macOS上按Cmd + Shift + P），在输入字段中输入"generate nested css"。从建议中选择"Vue CSS Generator: generate nested css"命令。
3. 配置快捷键：打开文件>首选项>键盘快捷键，找到对应的指令"vue-nested-css-generator.generate"进行相应的配置，然后点击配置的快捷键。

执行该指令后，会分析当前聚焦的vue文件，并生成对应的css代码到粘贴板。

## 解释

Vue CSS 生成器是一个 VSCode 插件，可以分析 Vue 模板并基于 DOM 元素结构生成对应的嵌套 CSS 代码。该插件考虑了每个 DOM 元素的标签和类，并生成与模板结构相匹配的 CSS 代码。

## 配置

|key|默认值|说明|
|--|--|--|
|`vncg.ingnoreTag`|`false`|表示插件在生成 CSS 代码时是否应忽略没有类名的 DOM 元素。|
|`vncg.openingTag`|`<style lang="less" scoped>`|指定用于包装生成的 CSS 代码的开放标记。|
|`vncg.closingTag`|`</style>`|指定用于包装生成的 CSS 代码的关闭标记。|

## License

[MIT](./LICENSE) License © 2022 [kkopite](https://github.com/action-hong)