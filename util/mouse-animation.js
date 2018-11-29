import { rn } from './tool'


function createCanvasDraw(target, w, h, x, y) {
  var canvas = document.createElement('canvas');
  canvas.width = w ? w : target.offsetWidth;
  canvas.height = h ? h : target.offsetHeight;
  canvas.style.position = 'absolute';
  var yDiff = window.pageYOffset;
  var xDiff = window.pageXOffset;
  canvas.style.left = x + xDiff + 'px' ? x + xDiff + 'px' : 0;
  canvas.style.top = y + yDiff + 'px' ? y + yDiff + 'px' : 0;
  target.insertBefore(canvas, target.firstChild);
  return canvas;
}
// 实现一次以Tween方式运动的 animate
function animate(s, e, i, tween, fn, callback) {
  // 引入tween进行函数计算
  var Tween = {
    Linear: function (t, b, c, d) { return c * t / d + b; },
    Quad: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    },
    Cubic: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    Quart: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    Quint: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    Sine: {
      easeIn: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    },
    Expo: {
      easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    Circ: {
      easeIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    Elastic: {
      easeIn: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
          s = p / 4;
          a = c;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOut: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
      },
      easeInOut: function (t, b, c, d, a, p) {
        var s;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (typeof p == "undefined") p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      }
    },
    Back: {
      easeIn: function (t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOut: function (t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOut: function (t, b, c, d, s) {
        if (typeof s == "undefined") s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
      }
    },
    Bounce: {
      easeIn: function (t, b, c, d) {
        return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
          return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
          return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
          return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
      },
      easeInOut: function (t, b, c, d) {
        if (t < d / 2) {
          return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
        } else {
          return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
      }
    }
  }
  var f = 60;
  var t = 0;
  var c = e - s;
  var d = (i / 1000) * f;
  var sport;
  var n;
  if (tween.math === 'Linear') {
    sport = Tween[tween.math]; //twennJs计算出数值，然后吧数值传递给fn
  } else {
    sport = Tween[tween.math][tween.type];
  }

  function loop() {
    t++;
    n = sport(t, s, c, d);
    if (t < d) {
      fn(n, t * 1000 / f)
      setTimeout(function () {
        loop()
      }, 1000 / f)
    } else if (t === d) {
      n = e;
      fn(n, t * 1000 / f);
      callback && callback()
    }
  }
  loop()
}
// 主方法，创建canvasDraw实现draw方法
function CanvasDraw(elem) {
  this.panel = elem;
  var canvas = this.panel.getContext("2d");

  //polyDiv.style.outline = "3px solid #666";
  //设置每个原点属性；
  this.drawCurve = function (cfg) {
    var _cfg = [];
    for (var i = 0; i < cfg.length; i++) {
      _cfg[i] = cfg[i]
    }
    //把点整理好
    var nextPoint = [];
    var prePiont = [];
    for (var i = 0; i < _cfg.length; i++) {
      // 移动到第一点
      if (i === 0) {
        canvas.moveTo(_cfg[i][0], _cfg[i][1]);
      }
      // 移动到第一点
      if (i > 0) {
        if (typeof _cfg[i] === "number") {
          nextPoint = _cfg[i + 1];
          prePiont = _cfg[i - 1];
          var x = prePiont[0] + (nextPoint[0] - prePiont[0]) * _cfg[i];
          var y = prePiont[1] + (nextPoint[1] - prePiont[1]) * _cfg[i];
          _cfg[i] = [x, y];

        }
      }
    }
    for (var i = 0; i < _cfg.length; i++) {
      this.drawBall(_cfg[i][0], _cfg[i][1], 10, '#f93')
    }
    canvas.beginPath()
    for (var i = 0; i < _cfg.length; i++) {

      if (i % 2 === 0) {
        if (i === 0) {
          canvas.moveTo(_cfg[i][0], _cfg[i][1])
        } else {
          canvas.quadraticCurveTo(_cfg[i - 1][0], _cfg[i - 1][1], _cfg[i][0], _cfg[i][1])
        }
      }
    }
    canvas.strokeStyle = "#999";
    canvas.stroke()
    return this
  }
  this.drawBall = function (x, y, radius, color) {
    canvas.beginPath()
    canvas.arc(x, y, radius, 0, Math.PI * 2);
    canvas.fillStyle = color;
    canvas.fill()
    return this
  }
  this.drawRing = function (x, y, radius, lineWidth, color) {
    canvas.beginPath()
    canvas.arc(x, y, radius, 0, Math.PI * 2);
    canvas.strokeStyle = color;
    canvas.lineWidth = lineWidth;
    canvas.stroke()
    return this
  }
  this.drawLine = function (x1, y1, x2, y2, color) {
    canvas.beginPath();
    canvas.moveTo(x1, y1)
    canvas.lineTo(x2, y2);
    canvas.strokeStyle = color;
    canvas.stroke()
    return this
  }
  this.drawImg = function (img, x, y, w, h) {
    canvas.drawImage(img, x, y, w, h);
    return this
  }
  this.drawTriaggle = function (point1, point2, point3, color) {
    canvas.beginPath();
    canvas.moveTo(point1[0], point1[1]);
    canvas.lineTo(point2[0], point2[1]);
    canvas.lineTo(point3[0], point3[1]);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill()
    return this
  }
  this.drawHeart = function (x, y, r, d, color) {
    canvas.beginPath()
    canvas.moveTo(x, y);
    canvas.bezierCurveTo(
      x - d / 6, y - r / 2,
      x - d, y - r / 2,
      x - d, y
    );
    canvas.bezierCurveTo(
      x - d, y + r / 2,
      x - d / 6, y + r - r / 4,
      x, y + r
    );
    canvas.bezierCurveTo(
      x + d / 6, y + r - r / 4,
      x + d, y + r / 2,
      x + d, y
    );
    canvas.bezierCurveTo(
      x + d, y - r / 2,
      x + d / 6, y - r / 2,
      x, y
    );

    canvas.fillStyle = color;
    canvas.closePath();

    canvas.fill()
    return this
  }
  this.drawSvg = function (path, color) {
    canvas.beginPath();
    canvas.moveTo(point1[0], point1[1]);
    canvas.lineTo(point2[0], point2[1]);
    canvas.lineTo(point3[0], point3[1]);
    canvas.closePath();
    canvas.fillStyle = color;
    canvas.fill()
    return this
  }
  this.rotate = function (deg) {

  }
  this.clear = function (x, y) {

    var cx = x ? x : canvas.width;
    var cy = y ? y : canvas.height;

    canvas.clearRect(0, 0, cx, cy)
    return this
  }
}

export default function mouseMoveAnimation(panelElem) {
  var nowTime = 60;
  var preTime = 0;
  var timeInterval = 40;
  panelElem.onmousemove = function (e, type) {
    nowTime = new Date().getTime();
    if (nowTime - preTime >= timeInterval) {
      // 更新时间
      preTime = nowTime;
      nowTime = new Date().getTime();
      // 创建画布
      var canvas = createCanvasDraw(panelElem, 100, 100, e.clientX - 50, e.clientY - 50);
      var cxt = new CanvasDraw(canvas);
      var colorStr = 'rgba(' + rn(30, 200) + ',' + rn(30, 200) + ',' + rn(30, 200) + ','
      animate(0, Math.random() * 30 + 10, 2000, { math: 'Quint', type: 'easeOut' }, function (value, time) {
        const color = colorStr + (0.9 - time / 2000 * 1) + ')'
        cxt.clear(100, 100).drawRing(50, 50, value, 8, color)
      }, function () {
        panelElem.removeChild(canvas);
      })
    }
  }
}