import { isElement, $id } from '@utils/element'
import { partial, partialObj } from '@utils/function'

import Between from 'between.js'

export default class RingRender {
  canvasNode = null
  ctx = null
  beginColor = ''
  endColor = undefined

  ringCanvasSize = null
  ringCenter = null
  ringRadius = null
  ringLineWidth = 10

  ringBeginAngle = (Math.PI * 2) / 3
  ringEndAngle = Math.PI / 3
  ringTotalAngle = 2 * Math.PI - this.ringBeginAngle + this.ringEndAngle
  ringColoredAngle = this.ringBeginAngle

  ringDripRadius = 8

  _processVal = 0
  get process() {
    return this._processVal
  }
  // val取值范围 [0 - 100]
  set process(val) {
    this.ringColoredAngle =
      (val / 100) * this.ringTotalAngle + this.ringBeginAngle

    this._processVal = val
  }

  constructor(canvasNode, beginColor, endColor) {
    this.canvasNode = canvasNode
    this.beginColor = beginColor
    this.endColor = endColor

    this.init()
  }

  static factory(node, beginColor, endColor = beginColor) {
    node = isElement(node) ? node : $id(node)
    let instance = new RingRender(node, beginColor, endColor)
    return instance
  }

  init() {
    let canvasNode = this.canvasNode

    let width = canvasNode.offsetWidth
    let height = canvasNode.offsetWidth

    this.ringRadius = Math.min(height, width) / 2 - this.ringDripRadius
    this.ringCenter = {
      x: width / 2,
      y: height / 2
    }
    this.ringCanvasSize = {
      height,
      width
    }
    this.ctx = canvasNode.getContext('2d')
  }

  // 瞬间更新图表
  instantUpdata(process) {
    this.process = process
    this._render()
  }

  // 动画更新图表
  smoothUpdata(process) {
    let from = this.process
    let to = process

    new Between(from, to).time(500).on('update', value => {
      this.process = value
      this._render()
    })
    // let anim = time => {
    //   requestAnimationFrame(anim)
    //   TWEEN.update(time)
    // }
    // anim()

    // let tweenObj = { x: curProcessVal }
    // new TWEEN.Tween(tweenObj)
    //   .to({ x: endProcessVal })
    //   .onUpdate(() => {
    //     this.process = tweenObj.x
    //     this._render()
    //   })
    //   .start()
  }

  // 启动渲染
  _render() {
    this.ctx.clearRect(
      0,
      0,
      this.ringCanvasSize.width,
      this.ringCanvasSize.height
    )

    this._renderBackdrop()
    // this._renderIcon()
    this._renderRate()
    this._renderText()
  }

  // _renderIcon() {
  //   let image = new Image()
  //   let iconSize = 40

  //   image.addEventListener('load', event => {
  //     this.ctx.drawImage(
  //       image,
  //       this.ringCenter.x - image.width / 2,
  //       this.ringCenter.y - image.height / 2
  //     )
  //   })

  //   image.src = require('@/assets/img/temperature.png')
  // }

  // 渲染文本
  _renderText() {
    let ctx = this.ctx
    ctx.beginPath()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '20px Microsoft YaHei'
    ctx.fillText(
      this.process.toFixed(2) + '%',
      this.ringCenter.x,
      this.ringCenter.y
    )
  }

  // 渲染圆环
  _renderRing({ beginColor, endColor = beginColor, endAngle }) {
    let ctx = this.ctx
    let lineWidth = this.ringLineWidth

    ctx.beginPath()
    ctx.lineWidth = lineWidth

    let strokeStyle
    if (beginColor === endColor) {
      strokeStyle = beginColor
    } else {
      strokeStyle = ctx.createLinearGradient(
        this.ringCenter.x - this.ringRadius - lineWidth,
        this.ringCenter.y,
        this.ringCenter.x + this.ringRadius + lineWidth,
        this.ringCenter.y
      )
      strokeStyle.addColorStop(0.0, beginColor)
      strokeStyle.addColorStop(0.4, endColor)
      strokeStyle.addColorStop(1.0, endColor)
    }
    ctx.strokeStyle = strokeStyle
    ctx.lineCap = 'round'
    ctx.arc(
      this.ringCenter.x,
      this.ringCenter.y,
      this.ringRadius,
      this.ringBeginAngle,
      endAngle
    )
    ctx.stroke()
  }

  // 渲染水滴
  _renderDrip() {
    let ctx = this.ctx

    let x =
      Math.cos(2 * Math.PI - this.ringColoredAngle) * this.ringRadius +
      this.ringCenter.x
    let y =
      this.ringCenter.y -
      Math.sin(2 * Math.PI - this.ringColoredAngle) * this.ringRadius

    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.fillStyle = this.endColor
    ctx.arc(x, y, this.ringDripRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  // 渲染圆环背景
  _renderBackdrop() {
    this._renderRing({
      beginColor: '#5868B0',
      endAngle: this.ringEndAngle
    })
  }

  // 渲染上色圆环
  _renderRate() {
    let { beginColor, endColor } = this
    this._renderRing({
      beginColor,
      endColor,
      endAngle: this.ringColoredAngle
    })

    this._renderDrip()
  }
}
