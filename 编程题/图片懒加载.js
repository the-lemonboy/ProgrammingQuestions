const imgList = [...document.querySelectorAll('img')]
const observe = new IntersectionObserver(entries=>{
    
})

const imgList = [...document.querySelectorAll('img')]

const observer = new IntersectionObserver((entries) =>{
  entries.forEach(item => {
    // isIntersecting是一个Boolean值，判断目标元素当前是否可见
    if (item.isIntersecting) {
      console.log(item.target.dataset.src)
      item.target.src = item.target.dataset.src
      // 图片加载后即停止监听该元素
      observer.unobserve(item.target)
    }
  })
}, {
  root: document.querySelector('.root')
})
