<template>
    <div class="burgerMenu">
        <!-- LE MENU -->
        <div id="sideNav" class="bm-menu">
            <nav class="bm-item-list">
                <slot></slot>
            </nav>
            <span class="bm-cross-button cross-style" @click="closeMenu">
                <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
                </span>
            </span>
        </div>
        <!-- LE BOUTON BURGER -->
        <div class="bm-burger-button" @click="openMenu">
            <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'menubar',
  data () {
    return {
      isSideBarOpen: false
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false
    },
    right: {
      type: Boolean,
      required: false
    },
    width: {
      type: [String],
      required: false,
      default: '300'
    },
    disableEsc: {
      type: Boolean,
      required: false
    },
    noOverlay: {
      type: Boolean,
      required: false
    },
    onStateChange: {
      type: Function,
      required: false
    },
    burgerIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    crossIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    openMenu () {
      this.$emit('openMenu')
      this.isSideBarOpen = true
      if (!this.noOverlay) {
        document.body.className += 'bm-overlay'
      }
      if (this.right) {
        document.querySelector('.bm-menu').style.left = 'auto'
        document.querySelector('.bm-menu').style.right = '0px'
      }
      this.$nextTick(function () {
        document.getElementById('sideNav').style.width = this.width
          ? this.width + 'px'
          : '300px'
      })
    },
    closeMenu () {
      this.$emit('closeMenu')
      this.isSideBarOpen = false
      document.body.className = document.body.className.replace(
        'bm-overlay',
        ''
      )
      document.getElementById('sideNav').style.width = '0px'
    },
    closeMenuOnEsc (e) {
      e = e || window.event
      if (e.key === 'Escape' || e.keyCode === 27) {
        document.getElementById('sideNav').style.width = '0px'
        document.body.style.backgroundColor = 'inherit'
        this.isSideBarOpen = false
      }
    },
    documentClick (e) {
      let element = document.querySelector('.bm-burger-button')
      let target = e.target
      if (element !== target && !element.contains(target)) {
        this.closeMenu()
      }
    }
  },
  mounted () {
    if (!this.disableEsc) {
      document.addEventListener('keyup', this.closeMenuOnEsc)
    }
    if (this.burgerIcon === false) {
      document.querySelector('.bm-burger-button').style.display = 'none'
    }
    if (this.crossIcon === false) {
      document.querySelector('.bm-cross-button').style.display = 'none'
    }
  },
  created: function () {
    document.addEventListener('click', this.documentClick)
  },
  destroyed: function () {
    document.removeEventListener('keyup', this.closeMenuOnEsc)
    document.removeEventListener('click', this.documentClick)
  },
  watch: {
    isOpen: {
      deep: true,
      immediate: true,
      handler (oldValue) {
        if (oldValue) {
          this.openMenu()
        }
      }
    },
    right: {
      deep: true,
      immediate: true,
      handler (oldValue, newValue) {
        if (oldValue) {
          this.$nextTick(() => {
            document.querySelector('.bm-burger-button').style.left = 'auto'
            document.querySelector('.bm-burger-button').style.right = '36px'
            document.querySelector('.bm-menu').style.left = 'auto'
            document.querySelector('.bm-menu').style.right = '0px'
          })
        }
        if (newValue) {
          if (
            document.querySelector('.bm-burger-button').hasAttribute('style')
          ) {
            document
              .querySelector('.bm-burger-button')
              .removeAttribute('style')
            document.getElementById('sideNav').style.right = 'auto'
          }
        }
      }
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
.bm-burger-button {
  position: absolute;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  cursor: pointer;
  z-index: 999;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #4c4545; /* COULEUR DU MENU BURGER */
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #4c4545; /* LA CROIX POUR FERMER */
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: #f5f5f5; /* LE FOND DU MENU */
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
  box-shadow: -2px -1px 8px 1px #f5f5f5;
}
.bm-overlay main{
  filter: blur(5px);
}
.bm-item-list {
  color: #423c3c;
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span:hover {
  text-decoration: underline;
  text-decoration-color: #423c3c;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: #423c3c;
}

@media screen and (min-width: 500px) {
  .bm-burger-bars {
    background-color: white; /* COULEUR DU MENU BURGER */
  }
  .bm-burger-button::before {
    content: '';
    display: block;
    background-color: #3a8ee6;
    /* padding: 2rem; */
    position: absolute;
    top: -2rem;
    right: -1.9rem;
    width: 5.6rem;
    height: 5.3rem;
    border-bottom-left-radius: 17px;
  }
}
</style>
