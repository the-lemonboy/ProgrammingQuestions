function h(tag, props, children){
  return { 
    tag,
    props,
    children
  }
}
function mount(vnode, container) {
  const el = document.createElement(vnode.tag);
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      el.setAttribute(key, value);
    }
  }
  //children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    }
  }
  container.appendChild(el);
}

const vDom = h("div", { class: "red" }, [h("span", null, ["hello"])]);
