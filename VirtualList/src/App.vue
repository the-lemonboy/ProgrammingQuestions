<template>
  <div class="app-container">
    <div class="container">
      <el-tree-select 
        v-model="value" 
        :data="treeData" 
        :render-after-expand="false" 
        show-checkbox
        @visible-change="seeTree" 
        style="width: 240px" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const value = ref();
const treeData = ref([]);
const initData = ref([]);
const start = ref(0);
const end = ref(0);
const itemHeight = ref(0);
const container = ref(null);
const wrap = ref(null);
const itemWrap = ref(null);
const phantom = ref(null);

// 生成树结构数据
function generateTree() {
  let id = 0;
  function createNode(level, parentValue = '') {
    if (level > 3) return [];
    const count = level === 1 ? 1000 : 1; // 第一层 1000 个，第二层 1 个，第三层 1 个
    return Array.from({ length: count }, (_, index) => {
      const nodeValue = parentValue ? `${parentValue}-${index}` : `${id++}`;
      const node = { label: `商品 ${nodeValue}`, value: nodeValue };
      if (level < 3) node.children = createNode(level + 1, nodeValue);
      return node;
    });
  }
  return createNode(1);
}

// 监听下拉框展开
const seeTree = () => {
  nextTick(() => {
    initDom();
    if (!itemHeight.value) return;
    updateVirtualScroll();
    watchWrap();
  });
};

// 初始化 DOM 相关元素
const initDom = () => {
  container.value = document.querySelector('.el-scrollbar');
  wrap.value = document.querySelector('.el-select-dropdown__wrap');
  itemWrap.value = document.querySelector('.el-select-dropdown__list');
  const firstItem = document.querySelector('.el-tree-node');
  if (firstItem) itemHeight.value = firstItem.clientHeight;
  if (!phantom.value) createPhantom();
};

// 创建占位高度
const createPhantom = () => {
  if (!wrap.value) return;
  phantom.value = document.createElement('div');
  phantom.value.classList.add('infinite-list-phantom');
  Object.assign(phantom.value.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '-1'
  });
  wrap.value.style.position = 'relative';
  wrap.value.appendChild(phantom.value);
};

// 更新虚拟列表
const updateVirtualScroll = () => {
  if (!container.value || !itemHeight.value) return;
  const visibleCount = Math.ceil(container.value.clientHeight / itemHeight.value);
  start.value = 0;
  end.value = visibleCount;
  treeData.value = initData.value.slice(0, visibleCount);
  if (phantom.value) phantom.value.style.height = `${initData.value.length * itemHeight.value}px`;
};

// 监听滚动事件
const watchWrap = () => {
  wrap.value?.addEventListener('scroll', () => {
    const scrollTop = wrap.value?.scrollTop || 0;
    start.value = Math.floor(scrollTop / itemHeight.value);
    end.value = start.value + Math.ceil((wrap.value?.clientHeight || 0) / itemHeight.value);
    treeData.value = initData.value.slice(start.value, Math.min(end.value, initData.value.length));
    
    if (itemWrap.value) {
      itemWrap.value.style.transform = `translate3D(0,${scrollTop - (scrollTop % itemHeight.value)}px,0)`;
    }
  });
};

// 组件挂载时初始化数据
onMounted(() => {
  initData.value = generateTree();
  treeData.value = initData.value;
});
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.container {
  width: 300px;
  height: 400px;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>