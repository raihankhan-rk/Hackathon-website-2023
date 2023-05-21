(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver(o => {
    for (const i of o)
      if (i.type === 'childList')
        for (const a of i.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : o.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
const W = (() => {
    const t = {};
    let e = 1;
    return {
      set(n, r, o) {
        typeof n[r] > 'u' && ((n[r] = { key: r, id: e }), e++),
          (t[n[r].id] = o);
      },
      get(n, r) {
        if (!n || typeof n[r] > 'u') return null;
        const o = n[r];
        return o.key === r ? t[o.id] : null;
      },
      delete(n, r) {
        if (typeof n[r] > 'u') return;
        const o = n[r];
        o.key === r && (delete t[o.id], delete n[r]);
      },
    };
  })(),
  P = {
    setData(t, e, n) {
      W.set(t, e, n);
    },
    getData(t, e) {
      return W.get(t, e);
    },
    removeData(t, e) {
      W.delete(t, e);
    },
  },
  Me = 1e6,
  $e = 1e3,
  Z = 'transitionend',
  je = t =>
    t == null
      ? `${t}`
      : {}.toString
          .call(t)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  Pe = t => {
    do t += Math.floor(Math.random() * Me);
    while (document.getElementById(t));
    return t;
  },
  be = t => {
    let e = t.getAttribute('data-te-target');
    if (!e || e === '#') {
      let n = t.getAttribute('href');
      if (!n || (!n.includes('#') && !n.startsWith('.'))) return null;
      n.includes('#') && !n.startsWith('#') && (n = `#${n.split('#')[1]}`),
        (e = n && n !== '#' ? n.trim() : null);
    }
    return e;
  },
  ye = t => {
    const e = be(t);
    return e && document.querySelector(e) ? e : null;
  },
  M = t => {
    const e = be(t);
    return e ? document.querySelector(e) : null;
  },
  Be = t => {
    if (!t) return 0;
    let { transitionDuration: e, transitionDelay: n } =
      window.getComputedStyle(t);
    const r = Number.parseFloat(e),
      o = Number.parseFloat(n);
    return !r && !o
      ? 0
      : ((e = e.split(',')[0]),
        (n = n.split(',')[0]),
        (Number.parseFloat(e) + Number.parseFloat(n)) * $e);
  },
  ze = t => {
    t.dispatchEvent(new Event(Z));
  },
  ve = t =>
    !t || typeof t != 'object'
      ? !1
      : (typeof t.jquery < 'u' && (t = t[0]), typeof t.nodeType < 'u'),
  J = t =>
    ve(t)
      ? t.jquery
        ? t[0]
        : t
      : typeof t == 'string' && t.length > 0
      ? document.querySelector(t)
      : null,
  G = (t, e, n) => {
    Object.keys(n).forEach(r => {
      const o = n[r],
        i = e[r],
        a = i && ve(i) ? 'element' : je(i);
      if (!new RegExp(o).test(a))
        throw new Error(
          `${t.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${o}".`
        );
    });
  },
  te = t => {
    if (!t || t.getClientRects().length === 0) return !1;
    if (t.style && t.parentNode && t.parentNode.style) {
      const e = getComputedStyle(t),
        n = getComputedStyle(t.parentNode);
      return (
        getComputedStyle(t).getPropertyValue('visibility') === 'visible' ||
        (e.display !== 'none' &&
          n.display !== 'none' &&
          e.visibility !== 'hidden')
      );
    }
    return !1;
  },
  ne = t =>
    !t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains('disabled')
      ? !0
      : typeof t.disabled < 'u'
      ? t.disabled
      : t.hasAttribute('disabled') && t.getAttribute('disabled') !== 'false',
  _e = t => {
    t.offsetHeight;
  },
  Ce = () => {
    const { jQuery: t } = window;
    return t && !document.body.hasAttribute('data-te-no-jquery') ? t : null;
  },
  F = [],
  Re = t => {
    document.readyState === 'loading'
      ? (F.length ||
          document.addEventListener('DOMContentLoaded', () => {
            F.forEach(e => e());
          }),
        F.push(t))
      : t();
  },
  T = () => document.documentElement.dir === 'rtl',
  ae = t => {
    typeof t == 'function' && t();
  },
  He = (t, e, n = !0) => {
    if (!n) {
      ae(t);
      return;
    }
    const r = 5,
      o = Be(e) + r;
    let i = !1;
    const a = ({ target: l }) => {
      l === e && ((i = !0), e.removeEventListener(Z, a), ae(t));
    };
    e.addEventListener(Z, a),
      setTimeout(() => {
        i || ze(e);
      }, o);
  },
  qe = /[^.]*(?=\..*)\.|.*/,
  We = /\..*/,
  Fe = /::\d+$/,
  Y = {};
let se = 1;
const Ye = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
  Ke = /^(mouseenter|mouseleave)/i,
  Ee = new Set([
    'click',
    'dblclick',
    'mouseup',
    'mousedown',
    'contextmenu',
    'mousewheel',
    'DOMMouseScroll',
    'mouseover',
    'mouseout',
    'mousemove',
    'selectstart',
    'selectend',
    'keydown',
    'keypress',
    'keyup',
    'orientationchange',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointerleave',
    'pointercancel',
    'gesturestart',
    'gesturechange',
    'gestureend',
    'focus',
    'blur',
    'change',
    'reset',
    'select',
    'submit',
    'focusin',
    'focusout',
    'load',
    'unload',
    'beforeunload',
    'resize',
    'move',
    'DOMContentLoaded',
    'readystatechange',
    'error',
    'abort',
    'scroll',
  ]);
function we(t, e) {
  return (e && `${e}::${se++}`) || t.uidEvent || se++;
}
function Ae(t) {
  const e = we(t);
  return (t.uidEvent = e), (Y[e] = Y[e] || {}), Y[e];
}
function Ve(t, e) {
  return function n(r) {
    return (
      (r.delegateTarget = t), n.oneOff && y.off(t, r.type, e), e.apply(t, [r])
    );
  };
}
function Ue(t, e, n) {
  return function r(o) {
    const i = t.querySelectorAll(e);
    for (let { target: a } = o; a && a !== this; a = a.parentNode)
      for (let l = i.length; l--; '')
        if (i[l] === a)
          return (
            (o.delegateTarget = a),
            r.oneOff && y.off(t, o.type, n),
            n.apply(a, [o])
          );
    return null;
  };
}
function Te(t, e, n = null) {
  const r = Object.keys(t);
  for (let o = 0, i = r.length; o < i; o++) {
    const a = t[r[o]];
    if (a.originalHandler === e && a.delegationSelector === n) return a;
  }
  return null;
}
function Ne(t, e, n) {
  const r = typeof e == 'string',
    o = r ? n : e;
  let i = De(t);
  return Ee.has(i) || (i = t), [r, o, i];
}
function le(t, e, n, r, o) {
  if (typeof e != 'string' || !t) return;
  if ((n || ((n = r), (r = null)), Ke.test(e))) {
    const w = A =>
      function (N) {
        if (
          !N.relatedTarget ||
          (N.relatedTarget !== N.delegateTarget &&
            !N.delegateTarget.contains(N.relatedTarget))
        )
          return A.call(this, N);
      };
    r ? (r = w(r)) : (n = w(n));
  }
  const [i, a, l] = Ne(e, n, r),
    s = Ae(t),
    h = s[l] || (s[l] = {}),
    f = Te(h, a, i ? n : null);
  if (f) {
    f.oneOff = f.oneOff && o;
    return;
  }
  const p = we(a, e.replace(qe, '')),
    b = i ? Ue(t, n, r) : Ve(t, n);
  (b.delegationSelector = i ? n : null),
    (b.originalHandler = a),
    (b.oneOff = o),
    (b.uidEvent = p),
    (h[p] = b),
    t.addEventListener(l, b, i);
}
function ee(t, e, n, r, o) {
  const i = Te(e[n], r, o);
  i && (t.removeEventListener(n, i, !!o), delete e[n][i.uidEvent]);
}
function Qe(t, e, n, r) {
  const o = e[n] || {};
  Object.keys(o).forEach(i => {
    if (i.includes(r)) {
      const a = o[i];
      ee(t, e, n, a.originalHandler, a.delegationSelector);
    }
  });
}
function De(t) {
  return (t = t.replace(We, '')), Ye[t] || t;
}
const y = {
    on(t, e, n, r) {
      le(t, e, n, r, !1);
    },
    one(t, e, n, r) {
      le(t, e, n, r, !0);
    },
    off(t, e, n, r) {
      if (typeof e != 'string' || !t) return;
      const [o, i, a] = Ne(e, n, r),
        l = a !== e,
        s = Ae(t),
        h = e.startsWith('.');
      if (typeof i < 'u') {
        if (!s || !s[a]) return;
        ee(t, s, a, i, o ? n : null);
        return;
      }
      h &&
        Object.keys(s).forEach(p => {
          Qe(t, s, p, e.slice(1));
        });
      const f = s[a] || {};
      Object.keys(f).forEach(p => {
        const b = p.replace(Fe, '');
        if (!l || e.includes(b)) {
          const w = f[p];
          ee(t, s, a, w.originalHandler, w.delegationSelector);
        }
      });
    },
    trigger(t, e, n) {
      if (typeof e != 'string' || !t) return null;
      const r = Ce(),
        o = De(e),
        i = e !== o,
        a = Ee.has(o);
      let l,
        s = !0,
        h = !0,
        f = !1,
        p = null;
      return (
        i &&
          r &&
          ((l = r.Event(e, n)),
          r(t).trigger(l),
          (s = !l.isPropagationStopped()),
          (h = !l.isImmediatePropagationStopped()),
          (f = l.isDefaultPrevented())),
        a
          ? ((p = document.createEvent('HTMLEvents')), p.initEvent(o, s, !0))
          : (p = new CustomEvent(e, { bubbles: s, cancelable: !0 })),
        typeof n < 'u' &&
          Object.keys(n).forEach(b => {
            Object.defineProperty(p, b, {
              get() {
                return n[b];
              },
            });
          }),
        f && p.preventDefault(),
        h && t.dispatchEvent(p),
        p.defaultPrevented && typeof l < 'u' && l.preventDefault(),
        p
      );
    },
  },
  Xe = '5.1.3';
class Oe {
  constructor(e) {
    (e = J(e)),
      e &&
        ((this._element = e),
        P.setData(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    P.removeData(this._element, this.constructor.DATA_KEY),
      y.off(this._element, this.constructor.EVENT_KEY),
      Object.getOwnPropertyNames(this).forEach(e => {
        this[e] = null;
      });
  }
  _queueCallback(e, n, r = !0) {
    He(e, n, r);
  }
  static getInstance(e) {
    return P.getData(J(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, n = {}) {
    return this.getInstance(e) || new this(e, typeof n == 'object' ? n : null);
  }
  static get VERSION() {
    return Xe;
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  static get DATA_KEY() {
    return `te.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
function K(t) {
  return t === 'true'
    ? !0
    : t === 'false'
    ? !1
    : t === Number(t).toString()
    ? Number(t)
    : t === '' || t === 'null'
    ? null
    : t;
}
function V(t) {
  return t.replace(/[A-Z]/g, e => `-${e.toLowerCase()}`);
}
const m = {
  setDataAttribute(t, e, n) {
    t.setAttribute(`data-te-${V(e)}`, n);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-te-${V(e)}`);
  },
  getDataAttributes(t) {
    if (!t) return {};
    const e = {};
    return (
      Object.keys(t.dataset)
        .filter(n => n.startsWith('te'))
        .forEach(n => {
          if (n.startsWith('teClass')) return;
          let r = n.replace(/^te/, '');
          (r = r.charAt(0).toLowerCase() + r.slice(1, r.length)),
            (e[r] = K(t.dataset[n]));
        }),
      e
    );
  },
  getDataClassAttributes(t) {
    if (!t) return {};
    const e = { ...t.dataset };
    return (
      Object.keys(e)
        .filter(n => n.startsWith('teClass'))
        .forEach(n => {
          let r = n.replace(/^teClass/, '');
          (r = r.charAt(0).toLowerCase() + r.slice(1, r.length)),
            (e[r] = K(e[n]));
        }),
      e
    );
  },
  getDataAttribute(t, e) {
    return K(t.getAttribute(`data-te-${V(e)}`));
  },
  offset(t) {
    const e = t.getBoundingClientRect();
    return {
      top: e.top + document.body.scrollTop,
      left: e.left + document.body.scrollLeft,
    };
  },
  position(t) {
    return { top: t.offsetTop, left: t.offsetLeft };
  },
  style(t, e) {
    Object.assign(t.style, e);
  },
  toggleClass(t, e) {
    t &&
      U(e).forEach(n => {
        t.classList.contains(n) ? t.classList.remove(n) : t.classList.add(n);
      });
  },
  addClass(t, e) {
    U(e).forEach(n => !t.classList.contains(n) && t.classList.add(n));
  },
  addStyle(t, e) {
    Object.keys(e).forEach(n => {
      t.style[n] = e[n];
    });
  },
  removeClass(t, e) {
    U(e).forEach(n => t.classList.contains(n) && t.classList.remove(n));
  },
  hasClass(t, e) {
    return t.classList.contains(e);
  },
};
function U(t) {
  return typeof t == 'string' ? t.split(' ') : Array.isArray(t) ? t : !1;
}
const Ze = 3,
  E = {
    closest(t, e) {
      return t.closest(e);
    },
    matches(t, e) {
      return t.matches(e);
    },
    find(t, e = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(e, t));
    },
    findOne(t, e = document.documentElement) {
      return Element.prototype.querySelector.call(e, t);
    },
    children(t, e) {
      return [].concat(...t.children).filter(n => n.matches(e));
    },
    parents(t, e) {
      const n = [];
      let r = t.parentNode;
      for (; r && r.nodeType === Node.ELEMENT_NODE && r.nodeType !== Ze; )
        this.matches(r, e) && n.push(r), (r = r.parentNode);
      return n;
    },
    prev(t, e) {
      let n = t.previousElementSibling;
      for (; n; ) {
        if (n.matches(e)) return [n];
        n = n.previousElementSibling;
      }
      return [];
    },
    next(t, e) {
      let n = t.nextElementSibling;
      for (; n; ) {
        if (this.matches(n, e)) return [n];
        n = n.nextElementSibling;
      }
      return [];
    },
    focusableChildren(t) {
      const e = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'details',
        '[tabindex]',
        '[contenteditable="true"]',
      ]
        .map(n => `${n}:not([tabindex^="-"])`)
        .join(', ');
      return this.find(e, t).filter(n => !ne(n) && te(n));
    },
  };
T();
T();
T();
T();
T();
T();
const Q = 'collapse',
  ke = 'te.collapse',
  z = `.${ke}`,
  ce = { toggle: !0, parent: null },
  Je = { toggle: 'boolean', parent: '(null|element)' },
  Ge = `show${z}`,
  et = `shown${z}`,
  tt = `hide${z}`,
  nt = `hidden${z}`,
  X = 'data-te-collapse-show',
  de = 'data-te-collapse-collapsed',
  j = 'data-te-collapse-collapsing',
  rt = 'data-te-collapse-horizontal',
  L = 'data-te-collapse-item',
  ue = `:scope [${L}] [${L}]`,
  ot = 'width',
  it = 'height',
  at =
    '[data-te-collapse-item][data-te-collapse-show], [data-te-collapse-item][data-te-collapse-collapsing]',
  he = '[data-te-collapse-init]',
  st = {
    visible: '!visible',
    hidden: 'hidden',
    baseTransition:
      'overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none',
    collapsing:
      'h-0 transition-[height] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none',
    collapsingHorizontal:
      'w-0 h-auto transition-[width] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none',
  },
  lt = {
    visible: 'string',
    hidden: 'string',
    baseTransition: 'string',
    collapsing: 'string',
    collapsingHorizontal: 'string',
  };
class x extends Oe {
  constructor(e, n, r) {
    super(e),
      (this._isTransitioning = !1),
      (this._config = this._getConfig(n)),
      (this._classes = this._getClasses(r)),
      (this._triggerArray = []);
    const o = E.find(he);
    for (let i = 0, a = o.length; i < a; i++) {
      const l = o[i],
        s = ye(l),
        h = E.find(s).filter(f => f === this._element);
      s !== null &&
        h.length &&
        ((this._selector = s), this._triggerArray.push(l));
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return ce;
  }
  static get NAME() {
    return Q;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let e = [],
      n;
    if (this._config.parent) {
      const s = E.find(ue, this._config.parent);
      e = E.find(at, this._config.parent).filter(h => !s.includes(h));
    }
    const r = E.findOne(this._selector);
    if (e.length) {
      const s = e.find(h => r !== h);
      if (((n = s ? x.getInstance(s) : null), n && n._isTransitioning)) return;
    }
    if (y.trigger(this._element, Ge).defaultPrevented) return;
    e.forEach(s => {
      r !== s && x.getOrCreateInstance(s, { toggle: !1 }).hide(),
        n || P.setData(s, ke, null);
    });
    const o = this._getDimension(),
      i =
        o === 'height'
          ? this._classes.collapsing
          : this._classes.collapsingHorizontal;
    m.removeClass(this._element, this._classes.visible),
      m.removeClass(this._element, this._classes.hidden),
      m.addClass(this._element, i),
      this._element.removeAttribute(L),
      this._element.setAttribute(j, ''),
      (this._element.style[o] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const a = () => {
        (this._isTransitioning = !1),
          m.removeClass(this._element, this._classes.hidden),
          m.removeClass(this._element, i),
          m.addClass(this._element, this._classes.visible),
          this._element.removeAttribute(j),
          this._element.setAttribute(L, ''),
          this._element.setAttribute(X, ''),
          (this._element.style[o] = ''),
          y.trigger(this._element, et);
      },
      l = `scroll${o[0].toUpperCase() + o.slice(1)}`;
    this._queueCallback(a, this._element, !0),
      (this._element.style[o] = `${this._element[l]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      y.trigger(this._element, tt).defaultPrevented
    )
      return;
    const e = this._getDimension(),
      n =
        e === 'height'
          ? this._classes.collapsing
          : this._classes.collapsingHorizontal;
    (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
      _e(this._element),
      m.addClass(this._element, n),
      m.removeClass(this._element, this._classes.visible),
      m.removeClass(this._element, this._classes.hidden),
      this._element.setAttribute(j, ''),
      this._element.removeAttribute(L),
      this._element.removeAttribute(X);
    const r = this._triggerArray.length;
    for (let i = 0; i < r; i++) {
      const a = this._triggerArray[i],
        l = M(a);
      l && !this._isShown(l) && this._addAriaAndCollapsedClass([a], !1);
    }
    this._isTransitioning = !0;
    const o = () => {
      (this._isTransitioning = !1),
        m.removeClass(this._element, n),
        m.addClass(this._element, this._classes.visible),
        m.addClass(this._element, this._classes.hidden),
        this._element.removeAttribute(j),
        this._element.setAttribute(L, ''),
        y.trigger(this._element, nt);
    };
    (this._element.style[e] = ''), this._queueCallback(o, this._element, !0);
  }
  _isShown(e = this._element) {
    return e.hasAttribute(X);
  }
  _getConfig(e) {
    return (
      (e = { ...ce, ...m.getDataAttributes(this._element), ...e }),
      (e.toggle = !!e.toggle),
      (e.parent = J(e.parent)),
      G(Q, e, Je),
      e
    );
  }
  _getClasses(e) {
    const n = m.getDataClassAttributes(this._element);
    return (e = { ...st, ...n, ...e }), G(Q, e, lt), e;
  }
  _getDimension() {
    return this._element.hasAttribute(rt) ? ot : it;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const e = E.find(ue, this._config.parent);
    E.find(he, this._config.parent)
      .filter(n => !e.includes(n))
      .forEach(n => {
        const r = M(n);
        r && this._addAriaAndCollapsedClass([n], this._isShown(r));
      });
  }
  _addAriaAndCollapsedClass(e, n) {
    e.length &&
      e.forEach(r => {
        n ? r.removeAttribute(de) : r.setAttribute(`${de}`, ''),
          r.setAttribute('aria-expanded', n);
      });
  }
  static jQueryInterface(e) {
    return this.each(function () {
      const n = {};
      typeof e == 'string' && /show|hide/.test(e) && (n.toggle = !1);
      const r = x.getOrCreateInstance(this, n);
      if (typeof e == 'string') {
        if (typeof r[e] > 'u') throw new TypeError(`No method named "${e}"`);
        r[e]();
      }
    });
  }
}
T(), T();
const pe = 'tab',
  ct = 'te.tab',
  R = `.${ct}`,
  dt = `hide${R}`,
  ut = `hidden${R}`,
  ht = `show${R}`,
  pt = `shown${R}`,
  gt = 'data-te-dropdown-menu-ref',
  S = 'data-te-tab-active',
  B = 'data-te-nav-active',
  ft = '[data-te-dropdown-ref]',
  mt = '[data-te-nav-ref]',
  ge = `[${S}]`,
  bt = `[${B}]`,
  fe = ':scope > li > .active',
  yt = '[data-te-dropdown-toggle-ref]',
  vt = ':scope > [data-te-dropdown-menu-ref] [data-te-dropdown-show]',
  _t = { show: 'opacity-100', hide: 'opacity-0' },
  Ct = { show: 'string', hide: 'string' };
class re extends Oe {
  constructor(e, n) {
    super(e), (this._classes = this._getClasses(n));
  }
  static get NAME() {
    return pe;
  }
  show() {
    if (
      this._element.parentNode &&
      this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
      this._element.getAttribute(B) === ''
    )
      return;
    let e;
    const n = M(this._element),
      r = this._element.closest(mt),
      o = E.findOne(bt, r);
    if (r) {
      const l = r.nodeName === 'UL' || r.nodeName === 'OL' ? fe : ge;
      (e = E.find(l, r)), (e = e[e.length - 1]);
    }
    const i = e ? y.trigger(e, dt, { relatedTarget: this._element }) : null;
    if (
      y.trigger(this._element, ht, { relatedTarget: e }).defaultPrevented ||
      (i !== null && i.defaultPrevented)
    )
      return;
    this._activate(this._element, r, null, o, this._element);
    const a = () => {
      y.trigger(e, ut, { relatedTarget: this._element }),
        y.trigger(this._element, pt, { relatedTarget: e });
    };
    n ? this._activate(n, n.parentNode, a, o, this._element) : a();
  }
  _getClasses(e) {
    const n = m.getDataClassAttributes(this._element);
    return (e = { ..._t, ...n, ...e }), G(pe, e, Ct), e;
  }
  _activate(e, n, r, o, i) {
    const a = (
        n && (n.nodeName === 'UL' || n.nodeName === 'OL')
          ? E.find(fe, n)
          : E.children(n, ge)
      )[0],
      l = r && a && a.hasAttribute(S),
      s = () => this._transitionComplete(e, a, r, o, i);
    a && l
      ? (m.removeClass(a, this._classes.show),
        m.addClass(a, this._classes.hide),
        this._queueCallback(s, e, !0))
      : s();
  }
  _transitionComplete(e, n, r, o, i) {
    if (n && o) {
      n.removeAttribute(S), o.removeAttribute(B);
      const l = E.findOne(vt, n.parentNode);
      l && l.removeAttribute(S),
        n.getAttribute('role') === 'tab' && n.setAttribute('aria-selected', !1);
    }
    e.setAttribute(S, ''),
      i.setAttribute(B, ''),
      e.getAttribute('role') === 'tab' && e.setAttribute('aria-selected', !0),
      _e(e),
      e.classList.contains(this._classes.hide) &&
        (m.removeClass(e, this._classes.hide),
        m.addClass(e, this._classes.show));
    let a = e.parentNode;
    if (
      (a && a.nodeName === 'LI' && (a = a.parentNode), a && a.hasAttribute(gt))
    ) {
      const l = e.closest(ft);
      l && E.find(yt, l).forEach(s => s.setAttribute(S, '')),
        e.setAttribute('aria-expanded', !0);
    }
    r && r();
  }
  static jQueryInterface(e) {
    return this.each(function () {
      const n = re.getOrCreateInstance(this);
      if (typeof e == 'string') {
        if (typeof n[e] > 'u') throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
(() => {
  var t = {
      454: (r, o, i) => {
        i.d(o, { Z: () => s });
        var a = i(645),
          l = i.n(a)()(function (h) {
            return h[1];
          });
        l.push([
          r.id,
          'INPUT:-webkit-autofill,SELECT:-webkit-autofill,TEXTAREA:-webkit-autofill{animation-name:onautofillstart}INPUT:not(:-webkit-autofill),SELECT:not(:-webkit-autofill),TEXTAREA:not(:-webkit-autofill){animation-name:onautofillcancel}@keyframes onautofillstart{}@keyframes onautofillcancel{}',
          '',
        ]);
        const s = l;
      },
      645: r => {
        r.exports = function (o) {
          var i = [];
          return (
            (i.toString = function () {
              return this.map(function (a) {
                var l = o(a);
                return a[2] ? '@media '.concat(a[2], ' {').concat(l, '}') : l;
              }).join('');
            }),
            (i.i = function (a, l, s) {
              typeof a == 'string' && (a = [[null, a, '']]);
              var h = {};
              if (s)
                for (var f = 0; f < this.length; f++) {
                  var p = this[f][0];
                  p != null && (h[p] = !0);
                }
              for (var b = 0; b < a.length; b++) {
                var w = [].concat(a[b]);
                (s && h[w[0]]) ||
                  (l &&
                    (w[2]
                      ? (w[2] = ''.concat(l, ' and ').concat(w[2]))
                      : (w[2] = l)),
                  i.push(w));
              }
            }),
            i
          );
        };
      },
      810: () => {
        (function () {
          if (typeof window < 'u')
            try {
              var r = new window.CustomEvent('test', { cancelable: !0 });
              if ((r.preventDefault(), r.defaultPrevented !== !0))
                throw new Error('Could not prevent default');
            } catch {
              var o = function (i, a) {
                var l, s;
                return (
                  ((a = a || {}).bubbles = !!a.bubbles),
                  (a.cancelable = !!a.cancelable),
                  (l = document.createEvent('CustomEvent')).initCustomEvent(
                    i,
                    a.bubbles,
                    a.cancelable,
                    a.detail
                  ),
                  (s = l.preventDefault),
                  (l.preventDefault = function () {
                    s.call(this);
                    try {
                      Object.defineProperty(this, 'defaultPrevented', {
                        get: function () {
                          return !0;
                        },
                      });
                    } catch {
                      this.defaultPrevented = !0;
                    }
                  }),
                  l
                );
              };
              (o.prototype = window.Event.prototype), (window.CustomEvent = o);
            }
        })();
      },
      379: (r, o, i) => {
        var a,
          l = (function () {
            var c = {};
            return function (u) {
              if (c[u] === void 0) {
                var d = document.querySelector(u);
                if (
                  window.HTMLIFrameElement &&
                  d instanceof window.HTMLIFrameElement
                )
                  try {
                    d = d.contentDocument.head;
                  } catch {
                    d = null;
                  }
                c[u] = d;
              }
              return c[u];
            };
          })(),
          s = [];
        function h(c) {
          for (var u = -1, d = 0; d < s.length; d++)
            if (s[d].identifier === c) {
              u = d;
              break;
            }
          return u;
        }
        function f(c, u) {
          for (var d = {}, g = [], v = 0; v < c.length; v++) {
            var C = c[v],
              _ = u.base ? C[0] + u.base : C[0],
              k = d[_] || 0,
              O = ''.concat(_, ' ').concat(k);
            d[_] = k + 1;
            var q = h(O),
              ie = { css: C[1], media: C[2], sourceMap: C[3] };
            q !== -1
              ? (s[q].references++, s[q].updater(ie))
              : s.push({ identifier: O, updater: xe(ie, u), references: 1 }),
              g.push(O);
          }
          return g;
        }
        function p(c) {
          var u = document.createElement('style'),
            d = c.attributes || {};
          if (d.nonce === void 0) {
            var g = i.nc;
            g && (d.nonce = g);
          }
          if (
            (Object.keys(d).forEach(function (C) {
              u.setAttribute(C, d[C]);
            }),
            typeof c.insert == 'function')
          )
            c.insert(u);
          else {
            var v = l(c.insert || 'head');
            if (!v)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
              );
            v.appendChild(u);
          }
          return u;
        }
        var b,
          w =
            ((b = []),
            function (c, u) {
              return (
                (b[c] = u),
                b.filter(Boolean).join(`
`)
              );
            });
        function A(c, u, d, g) {
          var v = d
            ? ''
            : g.media
            ? '@media '.concat(g.media, ' {').concat(g.css, '}')
            : g.css;
          if (c.styleSheet) c.styleSheet.cssText = w(u, v);
          else {
            var C = document.createTextNode(v),
              _ = c.childNodes;
            _[u] && c.removeChild(_[u]),
              _.length ? c.insertBefore(C, _[u]) : c.appendChild(C);
          }
        }
        function N(c, u, d) {
          var g = d.css,
            v = d.media,
            C = d.sourceMap;
          if (
            (v ? c.setAttribute('media', v) : c.removeAttribute('media'),
            C &&
              typeof btoa < 'u' &&
              (g += `
/*# sourceMappingURL=data:application/json;base64,`.concat(
                btoa(unescape(encodeURIComponent(JSON.stringify(C)))),
                ' */'
              )),
            c.styleSheet)
          )
            c.styleSheet.cssText = g;
          else {
            for (; c.firstChild; ) c.removeChild(c.firstChild);
            c.appendChild(document.createTextNode(g));
          }
        }
        var oe = null,
          Ie = 0;
        function xe(c, u) {
          var d, g, v;
          if (u.singleton) {
            var C = Ie++;
            (d = oe || (oe = p(u))),
              (g = A.bind(null, d, C, !1)),
              (v = A.bind(null, d, C, !0));
          } else
            (d = p(u)),
              (g = N.bind(null, d, u)),
              (v = function () {
                (function (_) {
                  if (_.parentNode === null) return !1;
                  _.parentNode.removeChild(_);
                })(d);
              });
          return (
            g(c),
            function (_) {
              if (_) {
                if (
                  _.css === c.css &&
                  _.media === c.media &&
                  _.sourceMap === c.sourceMap
                )
                  return;
                g((c = _));
              } else v();
            }
          );
        }
        r.exports = function (c, u) {
          (u = u || {}).singleton ||
            typeof u.singleton == 'boolean' ||
            (u.singleton =
              (a === void 0 &&
                (a = !!(window && document && document.all && !window.atob)),
              a));
          var d = f((c = c || []), u);
          return function (g) {
            if (
              ((g = g || []),
              Object.prototype.toString.call(g) === '[object Array]')
            ) {
              for (var v = 0; v < d.length; v++) {
                var C = h(d[v]);
                s[C].references--;
              }
              for (var _ = f(g, u), k = 0; k < d.length; k++) {
                var O = h(d[k]);
                s[O].references === 0 && (s[O].updater(), s.splice(O, 1));
              }
              d = _;
            }
          };
        };
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (o !== void 0) return o.exports;
    var i = (e[r] = { id: r, exports: {} });
    return t[r](i, i.exports, n), i.exports;
  }
  (n.n = r => {
    var o = r && r.__esModule ? () => r.default : () => r;
    return n.d(o, { a: o }), o;
  }),
    (n.d = (r, o) => {
      for (var i in o)
        n.o(o, i) &&
          !n.o(r, i) &&
          Object.defineProperty(r, i, { enumerable: !0, get: o[i] });
    }),
    (n.o = (r, o) => Object.prototype.hasOwnProperty.call(r, o)),
    (() => {
      var r = n(379),
        o = n.n(r),
        i = n(454);
      function a(s) {
        if (!s.hasAttribute('autocompleted')) {
          s.setAttribute('autocompleted', '');
          var h = new window.CustomEvent('onautocomplete', {
            bubbles: !0,
            cancelable: !0,
            detail: null,
          });
          s.dispatchEvent(h) || (s.value = '');
        }
      }
      function l(s) {
        s.hasAttribute('autocompleted') &&
          (s.removeAttribute('autocompleted'),
          s.dispatchEvent(
            new window.CustomEvent('onautocomplete', {
              bubbles: !0,
              cancelable: !1,
              detail: null,
            })
          ));
      }
      o()(i.Z, { insert: 'head', singleton: !1 }),
        i.Z.locals,
        n(810),
        document.addEventListener(
          'animationstart',
          function (s) {
            s.animationName === 'onautofillstart' ? a(s.target) : l(s.target);
          },
          !0
        ),
        document.addEventListener(
          'input',
          function (s) {
            s.inputType !== 'insertReplacementText' && 'data' in s
              ? l(s.target)
              : a(s.target);
          },
          !0
        );
    })();
})();
var H = function (t) {
    (this.element = t), (this.handlers = {});
  },
  Se = { isEmpty: { configurable: !0 } };
H.prototype.bind = function (t, e) {
  typeof this.handlers[t] > 'u' && (this.handlers[t] = []),
    this.handlers[t].push(e),
    this.element.addEventListener(t, e, !1);
};
H.prototype.unbind = function (t, e) {
  var n = this;
  this.handlers[t] = this.handlers[t].filter(function (r) {
    return e && r !== e ? !0 : (n.element.removeEventListener(t, r, !1), !1);
  });
};
H.prototype.unbindAll = function () {
  for (var t in this.handlers) this.unbind(t);
};
Se.isEmpty.get = function () {
  var t = this;
  return Object.keys(this.handlers).every(function (e) {
    return t.handlers[e].length === 0;
  });
};
Object.defineProperties(H.prototype, Se);
typeof document < 'u' && 'WebkitAppearance' in document.documentElement.style,
  typeof window < 'u' &&
    ('ontouchstart' in window ||
      ('maxTouchPoints' in window.navigator &&
        window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  typeof navigator < 'u' && navigator.msMaxTouchPoints,
  typeof navigator < 'u' && /Chrome/i.test(navigator && navigator.userAgent);
T();
T();
const Et = t => {
    Re(() => {
      const e = Ce();
      if (e) {
        const n = t.NAME,
          r = e.fn[n];
        (e.fn[n] = t.jQueryInterface),
          (e.fn[n].Constructor = t),
          (e.fn[n].noConflict = () => ((e.fn[n] = r), t.jQueryInterface));
      }
    });
  },
  wt = (t, e) => {
    y.on(document, `click.te.${t.NAME}`, e, function (n) {
      n.preventDefault(), t.getOrCreateInstance(this).toggle();
    });
  },
  At = (t, e) => {
    y.on(document, `click.te.${t.NAME}.data-api`, e, function (n) {
      ['A', 'AREA'].includes(this.tagName) && n.preventDefault(),
        !ne(this) && t.getOrCreateInstance(this).show();
    });
  },
  Tt = (t, e) => {
    y.on(document, `click.te.${t.NAME}.data-api`, e, function (n) {
      const r = M(this);
      if (
        (['A', 'AREA'].includes(this.tagName) && n.preventDefault(), ne(this))
      )
        return;
      y.one(r, t.EVENT_HIDDEN, () => {
        te(this) && this.focus();
      });
      const o = E.findOne(t.OPEN_SELECTOR);
      o && o !== r && t.getInstance(o).hide(),
        t.getOrCreateInstance(r).toggle(this);
    });
  },
  Nt = (t, e) => {
    y.on(document, `click.te.${t.NAME}`, e, n => {
      n.preventDefault();
      const r = n.target.closest(e);
      t.getOrCreateInstance(r).toggle();
    });
  },
  Dt = (t, e) => {
    y.on(document, `click.te.${t.NAME}`, e, function (n) {
      const r = M(this);
      ['A', 'AREA'].includes(this.tagName) && n.preventDefault(),
        y.one(r, t.EVENT_SHOW, i => {
          i.defaultPrevented ||
            y.one(r, t.EVENT_HIDDEN, () => {
              te(this) && this.focus();
            });
        });
      const o = E.findOne(`[${t.OPEN_SELECTOR}="true"]`);
      o && t.getInstance(o).hide(), t.getOrCreateInstance(r).toggle(this);
    });
  },
  Ot = (t, e) => {
    y.one(document, 'mousedown', e, t.autoInitial(new t()));
  },
  kt = (t, e) => {
    y.on(document, `click.te.${t.NAME}.data-api`, e, function (n) {
      (n.target.tagName === 'A' ||
        (n.delegateTarget && n.delegateTarget.tagName === 'A')) &&
        n.preventDefault();
      const r = ye(this);
      E.find(r).forEach(o => {
        t.getOrCreateInstance(o, { toggle: !1 }).toggle();
      });
    });
  },
  D = { plugins: { legend: { labels: { color: 'rgb(102,102,102)' } } } },
  St = {
    line: {
      options: {
        ...D,
        elements: {
          line: {
            backgroundColor: 'rgba(59, 112, 202, 0.0)',
            borderColor: 'rgb(59, 112, 202)',
            borderWidth: 2,
            tension: 0,
          },
          point: {
            borderColor: 'rgb(59, 112, 202)',
            backgroundColor: 'rgb(59, 112, 202)',
          },
        },
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: 'index' },
        datasets: { borderColor: 'red' },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
          y: {
            stacked: !1,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
        },
      },
    },
    bar: {
      options: {
        ...D,
        backgroundColor: 'rgb(59, 112, 202)',
        borderWidth: 0,
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: 'index' },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
          y: {
            stacked: !0,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
        },
      },
    },
    pie: {
      options: {
        ...D,
        elements: { arc: { backgroundColor: 'rgb(59, 112, 202)' } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    doughnut: {
      options: {
        ...D,
        elements: { arc: { backgroundColor: 'rgb(59, 112, 202)' } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    polarArea: {
      options: {
        ...D,
        elements: { arc: { backgroundColor: 'rgba(59, 112, 202, 0.5)' } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    radar: {
      options: {
        ...D,
        elements: {
          line: {
            backgroundColor: 'rgba(59, 112, 202, 0.5)',
            borderColor: 'rgb(59, 112, 202)',
            borderWidth: 2,
          },
          point: {
            borderColor: 'rgb(59, 112, 202)',
            backgroundColor: 'rgb(59, 112, 202)',
          },
        },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    scatter: {
      options: {
        ...D,
        elements: {
          line: {
            backgroundColor: 'rgba(59, 112, 202, 0.5)',
            borderColor: 'rgb(59, 112, 202)',
            borderWidth: 2,
            tension: 0,
          },
          point: {
            borderColor: 'rgb(59, 112, 202)',
            backgroundColor: 'rgba(59, 112, 202, 0.5)',
          },
        },
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: 'index' },
        datasets: { borderColor: 'red' },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
          y: {
            stacked: !1,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
        },
      },
    },
    bubble: {
      options: {
        ...D,
        elements: {
          point: {
            borderColor: 'rgb(59, 112, 202)',
            backgroundColor: 'rgba(59, 112, 202, 0.5)',
          },
        },
        responsive: !0,
        legend: { display: !0 },
        scales: {
          x: {
            grid: { display: !1 },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
          y: {
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: 'rgba(0,0,0, 0.5)' },
          },
        },
      },
    },
  },
  Lt = (t, e) => {
    const n = i =>
        (i[0] === '{' && i[i.length - 1] === '}') ||
        (i[0] === '[' && i[i.length - 1] === ']'),
      r = i =>
        typeof i != 'string' ? i : n(i) ? JSON.parse(i.replace(/'/g, '"')) : i,
      o = i => {
        const a = {};
        return (
          Object.keys(i).forEach(l => {
            if (l.match(/dataset.*/)) {
              const s = l.slice(7, 8).toLowerCase().concat(l.slice(8));
              a[s] = r(i[l]);
            }
          }),
          a
        );
      };
    E.find(e).forEach(i => {
      if (
        m.getDataAttribute(i, 'chart') !== 'bubble' &&
        m.getDataAttribute(i, 'chart') !== 'scatter'
      ) {
        const a = m.getDataAttributes(i),
          l = { data: { datasets: [o(a)] } };
        return (
          a.chart && (l.type = a.chart),
          a.labels && (l.data.labels = JSON.parse(a.labels.replace(/'/g, '"'))),
          new t(i, { ...l, ...St[l.type] })
        );
      }
      return null;
    });
  },
  I = {
    alert: { name: 'Alert', selector: '[data-te-alert-init]', isToggler: !1 },
    animation: {
      name: 'Animate',
      selector: '[data-te-animation-init]',
      isToggler: !1,
    },
    carousel: {
      name: 'Carousel',
      selector: '[data-te-carousel-init]',
      isToggler: !1,
    },
    chips: {
      name: 'ChipsInput',
      selector: '[data-te-chips-init]',
      isToggler: !1,
    },
    chip: { name: 'Chip', selector: '[data-te-chip-init]', isToggler: !1 },
    datepicker: {
      name: 'Datepicker',
      selector: '[data-te-datepicker-init]',
      isToggler: !1,
    },
    input: {
      name: 'Input',
      selector: '[data-te-input-wrapper-init]',
      isToggler: !1,
    },
    scrollspy: {
      name: 'ScrollSpy',
      selector: "[data-te-spy='scroll']",
      isToggler: !1,
    },
    select: {
      name: 'Select',
      selector: '[data-te-select-init]',
      isToggler: !1,
    },
    sidenav: {
      name: 'Sidenav',
      selector: '[data-te-sidenav-init]',
      isToggler: !1,
    },
    stepper: {
      name: 'Stepper',
      selector: '[data-te-stepper-init]',
      isToggler: !1,
    },
    timepicker: {
      name: 'Timepicker',
      selector: '[data-te-timepicker-init]',
      isToggler: !1,
    },
    toast: { name: 'Toast', selector: '[data-te-toast-init]', isToggler: !1 },
    chart: {
      name: 'Chart',
      selector: '[data-te-chart]',
      isToggler: !1,
      advanced: Lt,
    },
    button: {
      name: 'Button',
      selector: "[data-te-toggle='button']",
      isToggler: !0,
      callback: Nt,
    },
    collapse: {
      name: 'Collapse',
      selector: '[data-te-collapse-init]',
      isToggler: !0,
      callback: kt,
    },
    dropdown: {
      name: 'Dropdown',
      selector: '[data-te-dropdown-toggle-ref]',
      isToggler: !0,
      callback: wt,
    },
    modal: {
      name: 'Modal',
      selector: "[data-te-toggle='modal']",
      isToggler: !0,
      callback: Dt,
    },
    ripple: {
      name: 'Ripple',
      selector: '[data-te-ripple-init]',
      isToggler: !0,
      callback: Ot,
    },
    offcanvas: {
      name: 'Offcanvas',
      selector: '[data-te-offcanvas-toggle]',
      isToggler: !0,
      callback: Tt,
    },
    tab: {
      name: 'Tab',
      selector:
        "[data-te-toggle='tab'], [data-te-toggle='pill'], [data-te-toggle='list']",
      isToggler: !0,
      callback: At,
    },
  },
  It = t => I[t.NAME] || null,
  xt = t => {
    if (!t || [].includes(t.NAME)) return;
    [].push(t.NAME);
    const e = It(t),
      n = (e == null ? void 0 : e.isToggler) || !1;
    if ((Et(t), e != null && e.advanced)) {
      e == null || e.advanced(t, e == null ? void 0 : e.selector);
      return;
    }
    if (n) {
      e == null || e.callback(t, e == null ? void 0 : e.selector);
      return;
    }
    E.find(e == null ? void 0 : e.selector).forEach(r => {
      let o = t.getInstance(r);
      o || (o = new t(r));
    });
  },
  Mt = t => {
    t.forEach(e => xt(e));
  },
  Le = (t, e = !1) => {
    const n = Object.keys(I).map(r => {
      if (document.body.querySelector(I[r].selector)) {
        const o = t[I[r].name];
        return (
          !o &&
            ![].includes(r) &&
            e &&
            console.warn(
              `Please import ${I[r].name} from "tw-elements" package and add it to a object parameter inside "initTE" function`
            ),
          o
        );
      }
    });
    Mt(n);
  };
Pe('chips-input-');
Le({ Collapse: x });
Le({ Tab: re });
const $t = () => {
    new TypeIt('#blinking', { lifeLike: !1, speed: 0 })
      .type('.')
      .pause(435)
      .type('.')
      .pause(441)
      .type('.')
      .pause(438)
      .go();
  },
  jt = document.getElementById('preloader');
window.addEventListener('load', function () {
  $t(), (jt.style.display = 'none');
});
const me = document.getElementsByClassName('example');
for (let t = 0; t < me.length; t++) me[t].setAttribute('hidden', 'hidden');
(function () {
  let o = new Date(),
    i = String(o.getDate()).padStart(2, '0'),
    a = String(o.getMonth() + 1).padStart(2, '0'),
    l = o.getFullYear(),
    s = l,
    h = '08/12/',
    f = h + l;
  (o = a + '/' + i + '/' + l), o > f && (f = h + s);
  const p = new Date(f).getTime(),
    b = setInterval(function () {
      const w = new Date().getTime(),
        A = p - w;
      (document.getElementById('days').innerText = String(
        Math.floor(A / 864e5)
      ).padStart(2, '0')),
        (document.getElementById('hours').innerText = String(
          Math.floor((A % 864e5) / 36e5)
        ).padStart(2, '0')),
        (document.getElementById('minutes').innerText = String(
          Math.floor((A % 36e5) / 6e4)
        ).padStart(2, '0')),
        (document.getElementById('seconds').innerText = String(
          Math.floor((A % 6e4) / 1e3)
        ).padStart(2, '0')),
        A < 0 &&
          ((document.getElementById('headline').innerText =
            "It's my birthday!"),
          (document.getElementById('countdown').style.display = 'none'),
          (document.getElementById('content').style.display = 'block'),
          clearInterval(b));
    }, 0);
})();
new TypeIt('#element', { lifeLike: !1, speed: 0 })
  .type('s')
  .pause(135)
  .type('t')
  .pause(141)
  .type('a')
  .pause(138)
  .type('t')
  .pause(102)
  .type('y')
  .pause(84)
  .type('s')
  .pause(300)
  .delete(1)
  .pause(187)
  .delete(1)
  .pause(357)
  .type('u')
  .pause(69)
  .type('s')
  .pause(243)
  .type('_')
  .pause(298)
  .type('c')
  .pause(133)
  .type('o')
  .pause(10)
  .type('o')
  .pause(287)
  .type('d')
  .pause(186)
  .type('e')
  .pause(295)
  .move(-2)
  .pause(140)
  .delete(1)
  .pause(130)
  .move(null, { to: 'END' })
  .pause(192)
  .delete(1)
  .pause(329)
  .type('e')
  .pause(501)
  .type('_')
  .pause(956)
  .type('0')
  .go();
const $ = document.createElement('script');
$.src = 'https://apply.devfolio.co/v2/sdk.js';
$.async = !0;
$.defer = !0;
document.body.appendChild($);
window.addEventListener('beforeunload', () => {
  document.body.removeChild($);
});
