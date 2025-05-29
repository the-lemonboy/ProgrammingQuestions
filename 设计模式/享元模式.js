// ✅ 示例一：文字编辑器中的字符对象
class Character {
    constructor(char, font) {
      this.char = char;         // 外部状态
      this.font = font;         // 内部状态（可复用）
    }
  
    display(position) {
      console.log(`字符: ${this.char}, 字体: ${this.font}, 位置: ${position}`);
    }
  }
  
  class CharacterFactory {
    constructor() {
      this.characters = {}; // 缓存
    }
  
    getCharacter(char, font) {
      const key = `${char}_${font}`;
      if (!this.characters[key]) {
        this.characters[key] = new Character(char, font);
      }
      return this.characters[key];
    }
  }
  
  // 使用
  const factory = new CharacterFactory();
  const a1 = factory.getCharacter('A', 'Arial');
  const a2 = factory.getCharacter('A', 'Arial');
  console.log(a1 === a2); // true，共享同一个对象
  a1.display(1);
  a2.display(2);



//   ✅ 示例二：图标对象缓存（文件管理器）
class Icon {
    constructor(type) {
      this.type = type;
    }
  
    draw(position) {
      console.log(`在 ${position} 显示图标类型: ${this.type}`);
    }
  }
  
  class IconFactory {
    constructor() {
      this.icons = {};
    }
  
    getIcon(type) {
      if (!this.icons[type]) {
        this.icons[type] = new Icon(type);
      }
      return this.icons[type];
    }
  }
  
  const iconFactory = new IconFactory();
  const folder1 = iconFactory.getIcon('folder');
  const folder2 = iconFactory.getIcon('folder');
  console.log(folder1 === folder2); // true
  
  folder1.draw('桌面');
  folder2.draw('D盘');


//   ✅ 示例三：树的渲染（网页中的大量树）
class TreeType {
    constructor(name, color, texture) {
      this.name = name;
      this.color = color;
      this.texture = texture;
    }
  
    draw(x, y) {
      console.log(`在(${x}, ${y})绘制${this.name}，颜色${this.color}`);
    }
  }
  
  class TreeFactory {
    constructor() {
      this.treeTypes = {};
    }
  
    getTreeType(name, color, texture) {
      const key = `${name}_${color}_${texture}`;
      if (!this.treeTypes[key]) {
        this.treeTypes[key] = new TreeType(name, color, texture);
      }
      return this.treeTypes[key];
    }
  }
  
  class Tree {
    constructor(x, y, treeType) {
      this.x = x;
      this.y = y;
      this.treeType = treeType;
    }
  
    draw() {
      this.treeType.draw(this.x, this.y);
    }
  }
  
  // 使用
  const factory = new TreeFactory();
  const trees = [];
  for (let i = 0; i < 1000; i++) {
    trees.push(new Tree(i, i, factory.getTreeType('Oak', 'green', 'rough')));
  }
  trees.forEach(tree => tree.draw());