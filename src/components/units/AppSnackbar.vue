<template>
  <div v-show="showSnackBar" ref="wrapper" class="ui-snackbar-container">
    <i id="closeSnack" class="fas fa-times-circle" @click="close()"/>
    <div class="ui-snackbar">
      <div class="ui-snackbar-text">{{ text }}</div>
      <div v-if="showButtons" class="ui-snackbar-action">
        <button>
          <i v-if="type === 'fail'" id="iconFail" class="fas fa-exclamation-triangle fa-3x"/>
          <i v-else-if="type === 'warning'" id="iconWarning" class="fas fa-exclamation-circle fa-3x"/>
          <i v-else id="iconSuccess" class="fas fa-check-circle fa-3x"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {TimelineLite} from 'gsap'
import {mapActions} from "vuex";

export default {
  name: 'AppSnackbar',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success',
      validator: function (value) {
        return [
          'success',
          'fail',
          'warning'
        ].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      showSnackBar: false,
      showButtons: false
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.showSnackBar = true
        this.showButtons = true
        const tl = new TimelineLite()
        tl.fromTo(this.$refs.wrapper, 0.5, {
          display: 'block',
          marginBottom: '-100px',
          width: 'auto'
        }, {marginBottom: '10px'}, 0)
        let that = this
        setTimeout(function () {
          if (that.show) {
            that.close();
          }
        }, 3000);
      } else {
        this.close()
      }
    }
  },
  methods: {
    ...mapActions(['setSnackBar']),
    close() {
      this.showButtons = false
      const tl = new TimelineLite()
      let that = this
      tl.to(this.$refs.wrapper, 1, {
        marginBottom: '-100px',
        width: '0',
        onComplete: function () {
          tl.set(that.$refs.wrapper, {display: 'none', width: 'auto'})
          that.$emit('close')
          that.showSnackBar = false
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-snackbar-container {
  //display: none;
  position: absolute;
  overflow: hidden;
  z-index: 999;
  bottom: 0;
  left: 8px;
}

.ui-snackbar {
  display: inline-flex;
  align-items: center;

  min-width: 288px;
  max-width: 568px;
  min-height: 48px;

  padding: 14px 24px;
  margin: 4px 4px 8px 4px;

  border-radius: 2px;
  background-color: #323232;

}

.ui-snackbar-text {
  font-size: 14px;
  color: white;
}

.ui-snackbar-action {
  margin-left: auto;
  padding-left: 48px;

  button {
    border: none;
    background: none;
    margin: 0;
    padding: 0;

    font-size: 14px;
    text-transform: uppercase;

    color: #ffeb3b;
  }
}

.ui-snackbar-toggle-transition {
  transition: transform 0.3s ease;

  .ui-snackbar-text,
  .ui-snackbar-action {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
}

.ui-snackbar-toggle-enter,
.ui-snackbar-toggle-leave {
  transform: translateY(60px);

  .ui-snackbar-text,
  .ui-snackbar-action {
    opacity: 0;
  }
}

#closeSnack {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #ec2828;
}

#iconFail {
  color: #ec2828;
}

#iconWarning {
  color: orange;
}

#iconSuccess {
  color: #4BB543;
}

//Transitions
/*.slide-enter-active, .slide-leave-active {
  transition: margin-bottom .3s ease;
}

.slide-enter, .slide-leave-to {
  margin-bottom: -315px;
}

.slide-enter-to, .slide-leave {
  margin-bottom: 10px;
}*/
</style>
