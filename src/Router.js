let Router =
  function(route, routes) {
    this.static =
    { data:
      { selectors:
        { activeNav:
            '.active-nav'
        , activeElm:
            '.active-elm'
        }
      , classes:
        { activeNav:
            'active-nav'
        , activeElm:
            'active-elm'
        }
      }
    , active:
        function(selector) {
          return Array.prototype.slice.call(document.querySelectorAll(selector))
        }.bind(this)
    , take:
        function(nodes, on) {
          return nodes.length
            ? this.static.take(( nodes.pop().classList.remove(on)
                               , nodes
                               ))
            : nodes
        }.bind(this)
    , hash:
        function() {
          return window.location.hash.slice(1)
        }.bind(this)
    , predefined:
        function(routes) {
          let keys =
            Object.keys(routes)
          let key =
            keys.pop()
          return key
            ? ( this.add(key, routes[key])
              , delete routes[key]
              , this.static.predefined(routes)
              )
            : keys
        }.bind(this)
    , default:
        function(route) {
          return this.store.default = route
        }.bind(this)
    }
    this.store  =
    { default:
      ''
    , route:
      {}
    }
    this.add =
      function(route, selectors) {
        return this.store.route[route] =
          { elm: document.querySelector(selectors.elm)
          , nav: document.querySelector(selectors.nav)
          }
      }
    this.remove =
      function(route) {
        return delete this.store.route[route]
      }
    this.load =
      function(route) {
        let hash =
          ( window.location.hash =
              this.store.route[route]
                ? route
                : this.store.default
          , this.static.hash())
        let nodes =
          this.store.route[hash]
        let data =
          this.static.data
        let take =
          function(selector, name) {
            this.static.take(this.static.active(selector), name)
          }.bind(this)
        take(data.selectors.activeElm, data.classes.activeElm)
        take(data.selectors.activeNav, data.classes.activeNav)
        nodes.nav.classList.add(data.classes.activeNav)
        nodes.elm.classList.add(data.classes.activeElm)
        return this.static.hash()
    }
    window.onhashchange =
      function() {
        this.load(this.static.hash())
      }.bind(this)
    this.static.default(route)
    this.static.predefined(routes || {})
    this.load(this.static.hash())
}
