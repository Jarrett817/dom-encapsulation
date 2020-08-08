window.dom = {
    //增
    create(string) {
        const container = document.createElement(template)
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling) //插入在当前节点的下一个节点的前面
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //删
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        //const childNotes=node.childNotes
        const {
            childNodes
        } = node
        const array = []
        let x = childNodes.firstChild
        while (x) {
            array.push(dom.push(node.remove(x)))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (Attribute.length === 2) {
            return node.getAttribute(name)
        }
    },
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
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof object) {
                for (let key in name) {
                    node.style[key] = object[key]
                }
            }
        }
    },
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
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).
        filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        let list = dom.children(node.parentNode)
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                return i;
            }
        }
    }


}