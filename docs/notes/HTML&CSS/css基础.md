# CSS基础点整理

# 盒子模型
所有html元素可以看成一个盒子，它包括：边框 margin，边框 border，填充 padding，和 实际内容 content
## 标准盒子模型（W3C模型）
box-sizing: content-box; 盒子的大小会因为设置的内外边距和边框而变化，即：外扩；
标准盒模型宽高 = 内容区域（content）宽高
## 怪异盒子模型（IE盒模型）
box-sizing: box-border;盒子的实际大小是设置的大小，不会因为内外边距和边框的大小而变化，即：内缩；
怪异盒模型宽高 = border + padding + 内容区宽高（content）

# margin和padding
