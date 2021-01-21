<template>
  <div class="node-item" ref="node"
       :class="[(isActive || isSelected) ? 'active' : '']"
       :style="flowNodeContainer"
       v-click-outside="setNotActive"
       @click="setActive"
       @mouseenter="showAnchor"
       @mouseleave="hideAnchor">
      <span>{{node.label}}</span>
      <!--连线用--//触发连线的区域-->
      <div class="node-anchor anchor-top" v-show="mouseEnter"></div>
      <div class="node-anchor anchor-right" v-show="mouseEnter"></div>
      <div class="node-anchor anchor-bottom" v-show="mouseEnter"></div>
      <div class="node-anchor anchor-left" v-show="mouseEnter"></div>
      <div class="delete-btn" @click="deleteNode">
        <!-- <Icon type="md-close" /> -->
      </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: "nodeItem",
  props: {
      node: Object
  },
  directives: {
    ClickOutside
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          top: this.node.top,
          left: this.node.left
        };
      }
    }
  },
  data() {
    return {
      mouseEnter: false,
      isActive: false,
      isSelected: false
    };
  },
  methods: {
    showAnchor() {
      this.mouseEnter = true
    },
    hideAnchor() {
      this.mouseEnter = false
    },
    setActive() {
      if(window.event.ctrlKey){
        this.isSelected = !this.isSelected
        return false
      }
      this.isActive = true
      this.isSelected = false
      setTimeout(() => {
        this.$emit("changeLineState", this.node.id, true)
      },0)
    },
    setNotActive() {
      if(!window.event.ctrlKey){
        this.isSelected = false
      }
      if(!this.isActive) {
        return
      }
      this.$emit("changeLineState", this.node.id, false)
      this.isActive = false
    },
    deleteNode() {
      this.$emit("deleteNode", this.node)
    }
  }
};
</script>

<style lang="less" scoped>
@labelColor: #409eff;
@nodeSize: 20px;
@viewSize: 10px;
.node-item {
  position: absolute;
  display: flex;
  height: 50px;
  width: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 2px #696969;
  cursor: move;
  overflow: initial;
  background: #fbf4dc;
  padding: 0 10px;
  z-index: 9995;
  &:hover {
    z-index: 9998;
    .delete-btn{
      display: block;
    }
  }
  .node-anchor {
    display: flex;
    position: absolute;
    width: @nodeSize;
    height: @nodeSize;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: crosshair;
    z-index: 9999;
    background: -webkit-radial-gradient(sandybrown 10%, white 30%, #9a54ff 60%);
  }
  .anchor-top{
    top: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize/2)*-1);
  }
  .anchor-right{
    top: 50%;
    right: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }
  .anchor-bottom{
    bottom: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize / 2)*-1);
  }
  .anchor-left{
    top: 50%;
    left: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }
  .delete-btn{
    position: absolute;
    width: 20px;
    height: 20px;
    top: -9px;
    left: calc(100% - 15px);
    line-height: 18px;
    border: 1px solid #942929;
    border-radius: 10px;
    display: none;
    &:hover {
      cursor: pointer;
    }
  }
}
.active{
  border: 1px dashed @labelColor;
  box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.5);
}
</style>