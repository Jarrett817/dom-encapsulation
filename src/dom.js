window.dom = {
    //创建节点
    create(string) {
        const container = document.createElement(template)
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    //新增一个弟弟节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling) //插入在当前节点的下一个节点的前面
    },
    //新增一个哥哥节点
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    //新增儿子
    append(parent, node) {
        parent.appendChild(node)
    },
    // 新增爸爸
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //删
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // 删除后代
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.push(node.remove(x)))
            x = node.firstChild
        }
        return array
    },
    //属性读写
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (Attribute.length === 2) {
            return node.getAttribute(name)
        }
    },
    // 文本内容读写
    text(node, string) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string //ie
            } else {
                node.innerContent = string //firefox/chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText //ie
            } else {
                return node.innerContent //firefox/chrome
            }
        }
    },
    // html内容读写
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    //修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },
    // 增删class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contain(className)
        }
    },
    // 添加事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    // 删除事件监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    // 获取标签，可限制范围
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    // 获取父元素
    parent(node) {
        return node.parentNode
    },
    //获取子元素
    children(node) {
        return node.children
    },
    //获取所有兄弟姐妹
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    //获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    // 获取哥哥
    previous(node) {
        let x = node.previousSibling
        while (x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    //遍历节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //元素位置
    index(node) {
        let list = dom.children(node.parentNode)
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                return i;
            }
        }
    },
    delegateEvent(parentSelector, targetSelector, events, fn) {
        // 事件处理逻辑
        this.on(parentSelector, events, function (e) {

            let targetEl = e.target
            const currentTarget = e.currentTarget;

            // 遍历并判断是否为目标元素，如果不是，则往元素的 parentNode 继续查找
            while (!targetEl.matches(targetSelector)) {
                // 如果是目标元素则跳出循环
                if (targetEl === currentTarget) {
                    targetEl = null;
                    break;
                }
                targetEl = targetEl.parentNode;
            }

            if (targetEl) {
                // 将回调函数的 this 指向目标元素
                console.log(arguments)
                fn.call(targetEl, Array.prototype.slice.call(arguments));
            }
        });

    }


}