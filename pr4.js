class Dot {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get cords() {
    return `X:${this.x}, Y:${this.y}`
  }
  set cords(value) {
    this.x = value
    this.y = value
  }
}

let a = new Dot(1, 2)

