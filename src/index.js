//#region  constant
const ZERO = 0
//#endregion
//#region  config
const spriteStyle = {
  fontSize: '5rem',
  position: 'absolute',
  left: '100px', //initial position
  top: '100px', //initial position
  padding: '10px',
  border: 'dashed 1px gray',
  userSelect: 'none',
  width: '200px',
  height: '200px',
  overflow: 'hidden',
}
const handleStyle = {
  width: '25px',
  height: '25px',
  background: '#000',
  display: 'inline-block',
  position: 'absolute',
  left: 0,
  top: 0,
}
const state = {
  isMousePressed: false,
  isInsideBox: false,
  pos1: 0,
  pos2: 0,
  pos3: 0,
  pos4: 0,
}

//#endregion

//#region  common function
const createEle = (tagName = 'span') => document.createElement(tagName)
const forKey = (styleObject, action) =>
  Reflect.ownKeys(styleObject).forEach(k => action(k))
const getBound = target => ({
  w: target.offsetWidth,
  h: target.offsetHeight,
})
const toPixel = val => `${val}px` // 15 => 15px
const toNum = val => parseInt(val) // 15px => 15

//#endregion
class GragHandle {
  size = { x: 0, y: 0 }
  constructor(box) {
    this.box = box
    this.handles = {
      leftTop: createEle(),
      rightTop: createEle(),
      leftBottom: createEle(),
      rightBottom: createEle(),
    }

    forKey(this.handles, key => {
      let span = this.handles[key]
      box.appendChild(span)
      forKey(handleStyle, k => (span.style[k] = handleStyle[k]))
    })
    this.handles.leftTop.style.background = 'GREEN'

    this.handles.leftTop.onmousedown = () => {
      const move = e => {
        console.log(box.style.width, box.style.height)

        box.style.width = toPixel(toNum(box.style.width) + state.pos1)
        box.style.height = toPixel(toNum(box.style.height) + state.pos2)
        this.resetHandle()
      }

      this.handles.leftTop.onmousemove = move
    }

    this.resetHandle()
  }
  resetHandle() {
    let bound = getBound(this.box)

    this.handles.leftTop.style.left = ZERO
    this.handles.leftTop.style.top = ZERO

    this.handles.rightTop.style.left = toPixel(
      bound.w - toNum(handleStyle.width)
    )
    this.handles.rightTop.style.top = ZERO

    this.handles.leftBottom.style.left = ZERO
    this.handles.leftBottom.style.top = toPixel(
      bound.h - toNum(handleStyle.height)
    )

    this.handles.rightBottom.style.left = toPixel(
      bound.w - toNum(handleStyle.width)
    )
    this.handles.rightBottom.style.top = toPixel(
      bound.h - toNum(handleStyle.height)
    )
  }
}
function inintial() {
  const target = createSprite('🦄11🦄11')
  dragElement(target)
  new GragHandle(target)
}

function createSprite(content = '🦄') {
  const sprite = createEle()

  forKey(spriteStyle, k => (sprite.style[k] = spriteStyle[k]))
  sprite.innerText = content
  document.body.appendChild(sprite)

  return sprite
}

function dragElement(ele) {
  ele.onmousedown = dragMouseDown
  function dragMouseDown(e) {
    state.pos3 = e.clientX
    state.pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    state.pos1 = state.pos3 - e.clientX
    state.pos2 = state.pos4 - e.clientY
    state.pos3 = e.clientX
    state.pos4 = e.clientY
    // set the element's new position:
    ele.style.top = toPixel(ele.offsetTop - state.pos2)
    ele.style.left = toPixel(ele.offsetLeft - state.pos1)
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null
    document.onmousemove = null
  }
}
inintial()

/**
 * Features
 * # Support loading components style from the global variables CSS-JS
 * # A class managers the draggble handle components
 * TODO list
 *
 */
